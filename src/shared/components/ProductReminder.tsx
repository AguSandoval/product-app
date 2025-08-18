import * as ExpoCalendarReminder from "expo-calendar-reminder";
import React, { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface Product {
    id: string;
    name: string;
    price: number;
    description?: string;
}

interface ProductReminderProps {
    product: Product;
}

export default function ProductReminder({ product }: ProductReminderProps) {
    const [reminderTitle, setReminderTitle] = useState(
        `Reminder: ${product.name}`
    );
    const [notes, setNotes] = useState("Don't forget to buy this product");
    const [reminderDate, setReminderDate] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleAddReminder = async () => {
        if (!reminderDate) {
            Alert.alert("Error", "Please select a date for the reminder");
            return;
        }

        setIsLoading(true);

        try {
            const hasPermission =
                await ExpoCalendarReminder.default.requestCalendarPermissions();

            if (!hasPermission) {
                Alert.alert(
                    "Permission Required",
                    "We need access to your calendar to create reminders. Go to Settings > Privacy > Calendars to enable it."
                );
                setIsLoading(false);
                return;
            }

            const result =
                await ExpoCalendarReminder.default.addProductReminder({
                    title: reminderTitle,
                    productName: product.name,
                    notes: `${notes}\n\nProduct: ${product.name}\nPrice: $${
                        product.price
                    }\nDescription: ${product.description || "N/A"}`,
                    reminderDate: reminderDate,
                    url: `productsapp://product/${product.id}`,
                });

            if (result.success) {
                Alert.alert(
                    "Reminder Created",
                    `The reminder "${reminderTitle}" has been added to your calendar`,
                    [{ text: "OK", style: "default" }]
                );
            } else {
                Alert.alert(
                    "Error",
                    result.error || "Could not create reminder"
                );
            }
        } catch (error) {
            console.error("Error creating reminder:", error);
            Alert.alert(
                "Error",
                "An error occurred while creating the reminder"
            );
        } finally {
            setIsLoading(false);
        }
    };

    // sets the default reminder date to tomorrow at 10:00 AM, we could edit this using
    // the date picker but for this case we will use a fixed date
    const getDefaultDate = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(10, 0, 0, 0);
        return tomorrow.toISOString();
    };

    React.useEffect(() => {
        setReminderDate(getDefaultDate());
    }, []);

    const formatDateForDisplay = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleDateString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Reminder</Text>

            <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>
                    ${product.price.toFixed(2)}
                </Text>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Reminder Title:</Text>
                <TextInput
                    style={styles.input}
                    value={reminderTitle}
                    onChangeText={setReminderTitle}
                    placeholder="Reminder Title"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Additional Notes:</Text>
                <TextInput
                    style={[styles.input, styles.notesInput]}
                    value={notes}
                    onChangeText={setNotes}
                    placeholder="Additional Notes"
                    multiline
                    numberOfLines={3}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Reminder Date:</Text>
                <Text style={styles.dateDisplay}>
                    {reminderDate
                        ? formatDateForDisplay(reminderDate)
                        : "Select Date"}
                </Text>
            </View>

            <TouchableOpacity
                style={[styles.button, isLoading && styles.buttonDisabled]}
                onPress={handleAddReminder}
                disabled={isLoading}
            >
                <Text style={styles.buttonText}>
                    {isLoading ? "Creating reminder..." : "Add to Calendar"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 12,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 16,
        textAlign: "center",
    },
    productInfo: {
        backgroundColor: "#f8f9fa",
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    productName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#007AFF",
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: "500",
        color: "#666",
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: "#fff",
    },
    notesInput: {
        height: 80,
        textAlignVertical: "top",
    },
    dateDisplay: {
        fontSize: 16,
        color: "#333",
        padding: 12,
        backgroundColor: "#f8f9fa",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    button: {
        backgroundColor: "#007AFF",
        padding: 16,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 8,
    },
    buttonDisabled: {
        backgroundColor: "#999",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
