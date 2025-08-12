import { getCategories } from "@/api/products/services";
import { CategoryFilter } from "@/components/CategoryFilter";
import { MessageBox } from "@/components/MessageBox";
import { ProductSortControls } from "@/components/ProductSortControls";
import Spinner from "@/components/Spinner";
import { useProductFilter } from "@/hooks/useProductFilter";

import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
    const categoriesQuery = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    const {
        selectedCategory,
        setSelectedCategory,
        sortOption,
        setSortOption,
        sortedProducts,
        isLoading,
        isError,
    } = useProductFilter();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <CategoryFilter
                    categories={categoriesQuery.data || []}
                    selected={selectedCategory}
                    onSelect={setSelectedCategory}
                />
                <ProductSortControls
                    sortOption={sortOption}
                    onChangeSort={setSortOption}
                />
            </View>

            {isLoading && <Spinner withOverlay />}

            {isError && (
                <MessageBox
                    type="error"
                    message="Error loading products. Please try again."
                />
            )}

            <View
                style={{
                    // padding: 12,
                    flex: 1,
                }}
            >
                <FlashList
                    data={sortedProducts}
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
                    ListEmptyComponent={() =>
                        !isLoading && !isError ? (
                            <MessageBox
                                type="empty"
                                message="No products found."
                            />
                        ) : null
                    }
                />
            </View>
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
