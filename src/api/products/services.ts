import { api } from "../client";
import {
    Category,
    mapCategoryFromApi,
    mapProductFromApi,
    Product,
} from "./mapper";

import { CategoryApiResponse, ProductsApiResponse } from "./types";

export const getProducts = async (): Promise<Product[]> => {
    const res = await api.get<ProductsApiResponse>("/products");
    return res.data.products.map(mapProductFromApi);
};

export const getCategories = async (): Promise<Category[]> => {
    const res = await api.get<CategoryApiResponse>("/products/categories");
    return res.data.map(mapCategoryFromApi);
};

export const getProductsByCategory = async (
    category: string
): Promise<Product[]> => {
    const res = await api.get<ProductsApiResponse>(
        `/products/category/${category}`
    );
    return res.data.products.map(mapProductFromApi);
};

export const getProductById = async (id: number | string): Promise<Product> => {
    const res = await api.get(`/products/${id}`);
    return mapProductFromApi(res.data);
};
