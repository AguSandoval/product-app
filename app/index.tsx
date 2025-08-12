import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

import {
    getCategories,
    getProducts,
    getProductsByCategory,
} from "@/api/products/services";
import { CategoryFilter } from "@/components/CategoryFilter";
import { FlashList } from "@shopify/flash-list";
import { useState } from "react";

export default function HomeScreen() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );

    const categoriesQuery = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    const productsQuery = useQuery({
        queryKey: ["products", selectedCategory],
        queryFn: () =>
            selectedCategory
                ? getProductsByCategory(selectedCategory)
                : getProducts(),
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <CategoryFilter
                    categories={categoriesQuery.data || []}
                    selected={selectedCategory}
                    onSelect={setSelectedCategory}
                />
            </View>

            {productsQuery.isLoading && (
                <View
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 50,
                        backgroundColor: "rgba(255, 255, 255, 0.5)",
                    }}
                >
                    <ActivityIndicator color="indigo" />
                </View>
            )}

            <FlashList
                data={productsQuery.data}
                keyExtractor={(item) => item.id.toString()}
                estimatedItemSize={100}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Image
                            source={{ uri: item.thumbnail }}
                            style={styles.thumbnail}
                        />
                        <View style={styles.info}>
                            <Text numberOfLines={1} style={styles.title}>
                                {item.title}
                            </Text>
                            <Text style={styles.price}>${item.price}</Text>
                        </View>
                    </View>
                )}
                contentContainerStyle={{ paddingBottom: 120 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    header: {
        paddingVertical: 8,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        zIndex: 100,
    },
    item: {
        flexDirection: "row",
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#f2f2f2",
    },
    thumbnail: { width: 64, height: 64, borderRadius: 6 },
    info: { marginLeft: 12, justifyContent: "center", flex: 1 },
    title: { fontSize: 16, fontWeight: "600" },
    price: { color: "#666", marginTop: 4 },
});
