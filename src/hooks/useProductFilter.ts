import { useMemo, useState } from "react";

import { getProducts, getProductsByCategory } from "@/api/products/services";
import { useQuery } from "@tanstack/react-query";

type SortOption =
    | "price_asc"
    | "price_desc"
    | "rating_asc"
    | "rating_desc"
    | null;

export function useProductFilter() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );
    const [sortOption, setSortOption] = useState<SortOption>(null);

    const productsQuery = useQuery({
        queryKey: ["products", selectedCategory],
        queryFn: () =>
            selectedCategory
                ? getProductsByCategory(selectedCategory)
                : getProducts(),
    });

    const sortedProducts = useMemo(() => {
        if (!productsQuery.data) return [];

        const productsCopy = [...productsQuery.data];

        // TODO: this logic is kinda repetitive, but was easy to implement, I might refactor it
        // HINT: api also provides sorting options, so we could use that instead
        switch (sortOption) {
            case "price_asc":
                productsCopy.sort((a, b) => a.price - b.price);
                break;
            case "price_desc":
                productsCopy.sort((a, b) => b.price - a.price);
                break;
            case "rating_asc":
                productsCopy.sort((a, b) => a.rating - b.rating);
                break;
            case "rating_desc":
                productsCopy.sort((a, b) => b.rating - a.rating);
                break;
        }
        return productsCopy;
    }, [productsQuery.data, sortOption]);

    return {
        selectedCategory,
        setSelectedCategory,
        sortOption,
        setSortOption,
        sortedProducts,
        isLoading: productsQuery.isLoading,
        isError: productsQuery.isError,
    };
}
