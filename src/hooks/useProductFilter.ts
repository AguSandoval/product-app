import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";

import { Product } from "@/api/products/mapper";
import { getProducts, getProductsByCategory } from "@/api/products/services";

type SortOption =
    | "price_asc"
    | "price_desc"
    | "rating_asc"
    | "rating_desc"
    | null;

interface ProductsPage {
    products: Product[];
    skip: number;
}

const PAGE_SIZE = 10;

export function useProductFilter() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );
    const [sortOption, setSortOption] = useState<SortOption>(null);

    const fetchProducts = useCallback(
        (pageParam: number) =>
            selectedCategory
                ? getProductsByCategory(selectedCategory, PAGE_SIZE, pageParam)
                : getProducts(PAGE_SIZE, pageParam),
        [selectedCategory]
    );

    const productsQuery = useInfiniteQuery<ProductsPage>({
        queryKey: ["products", selectedCategory],
        initialPageParam: 0,
        queryFn: ({ pageParam }) => {
            return fetchProducts(pageParam as number);
        },
        getNextPageParam: (lastPage: ProductsPage) => {
            if (lastPage.products.length < PAGE_SIZE) return undefined;
            return lastPage.skip + PAGE_SIZE;
        },
    });

    const allProducts = useMemo(() => {
        if (!productsQuery.data) return [];
        const combined = productsQuery.data.pages.flatMap(
            (page) => page.products
        );

        switch (sortOption) {
            case "price_asc":
                combined.sort((a, b) => a.price - b.price);
                break;
            case "price_desc":
                combined.sort((a, b) => b.price - a.price);
                break;
            case "rating_asc":
                combined.sort((a, b) => a.rating - b.rating);
                break;
            case "rating_desc":
                combined.sort((a, b) => b.rating - a.rating);
                break;
            default:
                break;
        }

        return combined;
    }, [productsQuery.data, sortOption]);

    return {
        selectedCategory,
        setSelectedCategory,
        sortOption,
        setSortOption,
        sortedProducts: allProducts,
        isLoading: productsQuery.isLoading && !productsQuery.data,
        isError: productsQuery.isError,
        fetchNextPage: productsQuery.fetchNextPage,
        hasNextPage: productsQuery.hasNextPage,
        isFetchingNextPage: productsQuery.isFetchingNextPage,
    };
}
