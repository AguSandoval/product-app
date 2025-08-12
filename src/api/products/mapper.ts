import { CategoryApi, ProductApi } from "./types";

export interface Category {
    name: string;
    slug: string;
    url: string;
}

export interface Product {
    id: number;
    title: string;
    price: number;
    rating: number;
    brand: string;
    category: Category;
    thumbnail: string;
    stock: number;
    description: string;
}

export const mapProductFromApi = (apiProduct: ProductApi): Product => ({
    id: apiProduct.id,
    title: apiProduct.title,
    price: apiProduct.price,
    rating: apiProduct.rating,
    brand: apiProduct.brand,
    category: apiProduct.category,
    thumbnail: apiProduct.thumbnail,
    stock: apiProduct.stock,
    description: apiProduct.description,
});

export const mapCategoryFromApi = (apiCategory: CategoryApi): Category => {
    return {
        name: apiCategory.name,
        slug: apiCategory.slug,
        url: apiCategory.url,
    };
};
