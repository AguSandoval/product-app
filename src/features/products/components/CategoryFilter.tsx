import { Category } from "../api/mapper";
import { ScrollView, StyleSheet } from "react-native";
import { Chip } from "@/shared/components/ui";

interface CategoryFilterProps {
    categories: Category[];
    selected: string | null;
    onSelect: (category: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
    categories,
    selected,
    onSelect,
}) => {
    if (!categories.length) return null;

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            <Chip
                selected={selected === null}
                onPress={() => onSelect(null)}
                text="All"
            />

            {categories.map(({ name }) => {
                return (
                    <Chip
                        key={name}
                        selected={selected === name}
                        onPress={() => onSelect(name)}
                        text={name}
                    />
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
});

export default CategoryFilter;
