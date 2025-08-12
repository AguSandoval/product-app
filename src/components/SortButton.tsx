import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface SortButtonProps {
    label: string;
    active: boolean;
    onPress: () => void;
}

const SortButton: React.FC<SortButtonProps> = ({
    label,
    active,
    onPress,
}: SortButtonProps) => {
    return (
        <TouchableOpacity
            style={[styles.sortButton, active && styles.sortButtonActive]}
            onPress={onPress}
        >
            <Text
                style={[
                    styles.sortButtonText,
                    active && styles.sortButtonTextActive,
                ]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    sortButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        backgroundColor: "#eee",
        marginHorizontal: 4,
    },
    sortButtonActive: {
        backgroundColor: "#2C0755",
    },
    sortButtonText: {
        color: "#333",
    },
    sortButtonTextActive: {
        color: "#fff",
    },
});
export default SortButton;
