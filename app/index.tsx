import { getCategories } from "@/api/products/services";
import CategoryFilter from "@/components/CategoryFilter";
import { MessageBox } from "@/components/MessageBox";
import ProductItem from "@/components/ProductItem";
import { ProductSortControls } from "@/components/ProductSortControls";
import Spinner from "@/components/Spinner";
import { useProductFilter } from "@/hooks/useProductFilter";

import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function HomeScreen() {
    const categoriesQuery = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    const {
        selectedCategory,
        sortOption,
        sortedProducts,
        isLoading,
        isError,
        hasNextPage,
        isFetchingNextPage,
        setSelectedCategory,
        setSortOption,
        fetchNextPage,
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

            <FlashList
                data={sortedProducts}
                keyExtractor={(item) => item.id.toString()}
                estimatedItemSize={100}
                onEndReached={() => {
                    if (hasNextPage) {
                        fetchNextPage();
                    }
                }}
                onEndReachedThreshold={0.5}
                ListFooterComponent={isFetchingNextPage ? <Spinner /> : null}
                renderItem={({ item }) => <ProductItem product={item} />}
                contentContainerStyle={{ paddingBottom: 120, paddingTop: 10 }}
                ListEmptyComponent={() =>
                    !isLoading && !isError ? (
                        <MessageBox type="empty" message="No products found." />
                    ) : null
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f4f4f4" },
    header: {
        paddingTop: 8,
        zIndex: 100,
        backgroundColor: "#f4f4f4",
        shadowColor: "#f4f4f4",
        shadowOffset: { width: 0, height: 16 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 1,
    },
});
