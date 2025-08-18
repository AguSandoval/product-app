import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ChipProps {
    selected: boolean;
    text?: string;
    size?: "sm" | "md" | "lg";
    onPress: () => void;
}

const fontSize = {
    sm: 12,
    md: 14,
    lg: 16,
};

const Chip: React.FC<ChipProps> = ({
    selected,
    onPress,
    text,
    size = "lg",
}) => {
    return (
        <TouchableOpacity
            style={[styles.chip, selected && styles.selected, styles[size]]}
            onPress={onPress}
        >
            <Text
                style={[
                    styles.text,
                    selected && styles.textSelected,
                    { fontSize: fontSize[size] },
                ]}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    chip: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginRight: 8,
        backgroundColor: "#dfdfdf",
    },
    selected: {
        backgroundColor: "#131313",
    },
    text: {
        color: "#424242",
    },
    textSelected: {
        color: "#fff",
        fontWeight: 600,
    },
    sm: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        fontSize: 12,
    },
    md: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        fontSize: 14,
    },
    lg: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        fontSize: 16,
    },
});

export default Chip;
