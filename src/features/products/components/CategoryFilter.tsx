import { Chip } from "@/shared/components/ui";
import { useCallback, useRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Category } from "../api/mapper";

interface CategoryFilterProps {
    categories: Category[];
    selected: string | null;
    onSelect: (category: string | null) => void;
}

const HORIZONTAL_PADDING = 10;

const CategoryFilter: React.FC<CategoryFilterProps> = ({
    categories,
    selected,
    onSelect,
}) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const chipRefs = useRef<{ [key: string]: View | null }>({});

    const handleCategorySelect = useCallback(
        (category: string | null) => {
            onSelect(category);

            requestAnimationFrame(() => {
                const chipKey = category || "all";
                const targetChip = chipRefs.current[chipKey];

                if (targetChip && scrollViewRef.current) {
                    targetChip.measureLayout(
                        scrollViewRef.current as any, // come back to this and check types
                        (x) => {
                            scrollViewRef.current?.scrollTo({
                                x: Math.max(0, x - HORIZONTAL_PADDING),
                                animated: true,
                            });
                        }
                    );
                }
            });
        },
        [onSelect]
    );

    if (!categories.length) return null;

    return (
        <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            <View
                ref={(ref) => {
                    chipRefs.current["all"] = ref;
                }}
                style={styles.chipWrapper}
            >
                <Chip
                    selected={selected === null}
                    onPress={() => handleCategorySelect(null)}
                    text="All"
                />
            </View>

            {categories.map(({ name }) => {
                return (
                    <View
                        key={name}
                        ref={(ref) => {
                            chipRefs.current[name] = ref;
                        }}
                        style={styles.chipWrapper}
                    >
                        <Chip
                            selected={selected === name}
                            onPress={() => handleCategorySelect(name)}
                            text={name}
                        />
                    </View>
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
        paddingHorizontal: HORIZONTAL_PADDING,
    },
    chipWrapper: {
        marginRight: 8,
    },
});

export default CategoryFilter;
