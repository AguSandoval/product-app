import { Category } from "@/api/products/mapper";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
    categories: Category[];
    selected: string | null;
    onSelect: (category: string | null) => void;
}

export function CategoryFilter({ categories, selected, onSelect }: Props) {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            <TouchableOpacity
                style={[styles.chip, selected === null && styles.selected]}
                onPress={() => onSelect(null)}
            >
                <Text
                    style={[
                        styles.text,
                        selected === null && styles.textSelected,
                    ]}
                >
                    All
                </Text>
            </TouchableOpacity>

            {categories.map(({ name }) => {
                return (
                    <TouchableOpacity
                        key={name}
                        style={[
                            styles.chip,
                            selected === name && styles.selected,
                        ]}
                        onPress={() => onSelect(name)}
                    >
                        <Text
                            style={[
                                styles.text,
                                selected === name && styles.textSelected,
                            ]}
                        >
                            {name}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    chip: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        backgroundColor: "#f0f0f0",
        marginRight: 8,
    },
    selected: {
        backgroundColor: "#2C0755",
    },
    text: {
        color: "#333",
        fontSize: 14,
    },
    textSelected: {
        color: "#fff",
    },
});
