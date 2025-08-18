import React from "react";
import { StyleSheet, Text, View } from "react-native";

type MessageType = "error" | "empty" | "info";

interface MessageBoxProps {
    message: string;
    type?: MessageType;
    icon?: string;
}

const textColors = {
    error: "#b00020",
    empty: "#555",
    info: "#2563eb",
};

const iconsDefault = {
    error: "⚠️",
    empty: "📭",
    info: "ℹ️",
};

const backgroundColors = {
    error: "#f4dedb",
    empty: "#dfdfdf",
    info: "#dbeafe",
};

export function MessageBox({ message, type = "info", icon }: MessageBoxProps) {
    const bgColor = backgroundColors[type];
    const txtColor = textColors[type];
    const displayIcon = icon ?? iconsDefault[type];

    return (
        <View style={[styles.container, { backgroundColor: bgColor }]}>
            <Text style={[styles.text, { color: txtColor }]}>
                {displayIcon} {message}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderRadius: 8,
        margin: 12,
    },
    text: {
        fontSize: 16,
        textAlign: "center",
    },
});
