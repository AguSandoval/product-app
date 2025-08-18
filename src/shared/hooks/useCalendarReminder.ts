import * as ExpoCalendarReminder from "expo-calendar-reminder";
import { useCallback, useState } from "react";

export interface UseCalendarReminderOptions {
    onSuccess?: (eventId: string) => void;
    onError?: (error: string) => void;
}

export function useCalendarReminder(options: UseCalendarReminderOptions = {}) {
    const [isLoading, setIsLoading] = useState(false);
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);

    const requestPermissions = useCallback(async () => {
        try {
            setIsLoading(true);
            const granted =
                await ExpoCalendarReminder.default.requestCalendarPermissions();
            setHasPermission(granted);
            return granted;
        } catch (error) {
            console.error("Error requesting calendar permissions:", error);
            setHasPermission(false);
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const addReminder = useCallback(
        async (reminderOptions: {
            title: string;
            productName: string;
            notes?: string;
            reminderDate: string;
            url?: string;
        }) => {
            try {
                setIsLoading(true);

                let hasPerms = hasPermission;
                if (hasPerms === null) {
                    hasPerms = await requestPermissions();
                }

                if (!hasPerms) {
                    const error = "Calendar permissions not granted";
                    options.onError?.(error);
                    throw new Error(error);
                }

                const result =
                    await ExpoCalendarReminder.default.addProductReminder(
                        reminderOptions
                    );

                if (result.success && result.eventId) {
                    options.onSuccess?.(result.eventId);
                    return result;
                } else {
                    const error = result.error || "Unknown error occurred";
                    options.onError?.(error);
                    throw new Error(error);
                }
            } catch (error) {
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : "Unknown error occurred";
                options.onError?.(errorMessage);
                throw error;
            } finally {
                setIsLoading(false);
            }
        },
        [hasPermission, requestPermissions, options]
    );

    return {
        addReminder,
        requestPermissions,
        isLoading,
        hasPermission,
    };
}
