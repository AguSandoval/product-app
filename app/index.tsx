import {
    CategoryFilter,
    getCategories,
    ProductItem,
    ProductSortControls,
    useProductFilter,
} from "@/features/products";
import ProductItemSkeleton from "@/features/products/components/ProductItemSkeleton";
import { MessageBox, Spinner } from "@/shared/components";
import { AnimatedListItem } from "@/shared/components/AnimatedListItem";

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

            {isLoading && (
                <>
                    <FlashList
                        data={Array.from({ length: 4 })}
                        renderItem={() => <ProductItemSkeleton />}
                        scrollEnabled={false}
                        estimatedItemSize={100}
                        contentContainerStyle={{
                            paddingTop: 10,
                        }}
                        keyExtractor={(_, index) => index.toString()}
                    />
                </>
            )}

            {isError && (
                <MessageBox
                    type="error"
                    message="Error loading products. Please try again."
                />
            )}

            {!isLoading && (
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
                    ListFooterComponent={
                        isFetchingNextPage ? (
                            <View
                                style={{
                                    marginTop: 48,
                                }}
                            >
                                <Spinner />
                            </View>
                        ) : null
                    }
                    renderItem={({ item, index }) => (
                        <AnimatedListItem
                            index={index}
                            itemId={item.id}
                            delay={50}
                        >
                            <ProductItem product={item} />
                        </AnimatedListItem>
                    )}
                    contentContainerStyle={{
                        paddingBottom: 120,
                        paddingTop: 10,
                    }}
                    ListEmptyComponent={() =>
                        !isLoading && !isError ? (
                            <MessageBox
                                type="empty"
                                message="No products found."
                            />
                        ) : null
                    }
                />
            )}
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
