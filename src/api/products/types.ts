export interface ProductApi {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
}

export interface ProductsApiResponse {
    products: ProductApi[];
}

export interface CategoryApiResponse extends Array<string> {
    [index: number]: string;
}
