import * as Calendar from "expo-calendar";

export interface ProductReminderOptions {
    title: string;
    productName: string;
    notes?: string;
    reminderDate: string;
    url?: string;
}

export interface CalendarReminderResult {
    success: boolean;
    eventId?: string;
    error?: string;
}

export default {
    async addProductReminder(
        options: ProductReminderOptions
    ): Promise<CalendarReminderResult> {
        try {
            const { status } = await Calendar.requestCalendarPermissionsAsync();

            if (status !== "granted") {
                return {
                    success: false,
                    error: "Calendar permissions not granted",
                };
            }

            const calendars = await Calendar.getCalendarsAsync(
                Calendar.EntityTypes.EVENT
            );
            const defaultCalendar =
                calendars.find(
                    (cal) => cal.source.name === "Default" || cal.isPrimary
                ) || calendars[0];

            if (!defaultCalendar) {
                return {
                    success: false,
                    error: "No calendar found",
                };
            }

            const reminderDate = new Date(options.reminderDate);
            const endDate = new Date(reminderDate.getTime() + 60 * 60 * 1000);

            const eventId = await Calendar.createEventAsync(
                defaultCalendar.id,
                {
                    title: `${options.title} - ${options.productName}`,
                    notes: options.notes || "Reminder for product purchase",
                    startDate: reminderDate,
                    endDate: endDate,
                    alarms: [{ relativeOffset: -60 }],
                    url: options.url,
                }
            );

            return {
                success: true,
                eventId: eventId,
                error: undefined,
            };
        } catch (error) {
            console.error("Error creating calendar event:", error);
            return {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Unknown error occurred",
            };
        }
    },

    async requestCalendarPermissions(): Promise<boolean> {
        try {
            const { status } = await Calendar.requestCalendarPermissionsAsync();
            return status === "granted";
        } catch (error) {
            console.error("Error requesting calendar permissions:", error);
            return false;
        }
    },
};
