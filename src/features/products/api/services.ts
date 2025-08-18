import { api } from "@/shared/api";
import {
    Category,
    mapCategoryFromApi,
    mapProductFromApi,
    Product,
} from "./mapper";

import { CategoryApiResponse } from "./types";

export const getProducts = async (limit: number, skip: number) => {
    const res = await api.get(`/products?limit=${limit}&skip=${skip}`);
    return { products: res.data.products.map(mapProductFromApi), skip };
};

export const getCategories = async (): Promise<Category[]> => {
    const res = await api.get<CategoryApiResponse>("/products/categories");
    return res.data.map(mapCategoryFromApi);
};

export const getProductsByCategory = async (
    category: string,
    limit: number,
    skip: number
) => {
    const res = await api.get(
        `/products/category/${category}?limit=${limit}&skip=${skip}`
    );
    return { products: res.data.products.map(mapProductFromApi), skip };
};

export const getProductById = async (id: number | string): Promise<Product> => {
    const res = await api.get(`/products/${id}`);
    return mapProductFromApi(res.data);
};
