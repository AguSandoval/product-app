import { api } from "../client";
import { mapProductFromApi, Product } from "./mapper";
import { CategoryApiResponse, ProductsApiResponse } from "./types";

export const getProducts = async (): Promise<Product[]> => {
    const res = await api.get<ProductsApiResponse>("/products");
    return res.data.products.map(mapProductFromApi);
};

export const getCategories = async (): Promise<string[]> => {
    const res = await api.get<CategoryApiResponse>("/products/categories");
    return res.data;
};

export const getProductsByCategory = async (
    category: string
): Promise<Product[]> => {
    const res = await api.get<ProductsApiResponse>(
        `/products/category/${category}`
    );
    return res.data.products.map(mapProductFromApi);
};

export const getProductById = async (id: number): Promise<Product> => {
    const res = await api.get(`/products/${id}`);
    return mapProductFromApi(res.data);
};
