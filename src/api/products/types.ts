export interface ProductApi {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    stock: number;
    brand: string;
    category: {
        name: string;
        slug: string;
        url: string;
    };
    thumbnail: string;
}

export interface CategoryApi {
    name: string;
    slug: string;
    url: string;
}

export interface ProductsApiResponse {
    products: ProductApi[];
}

export interface CategoryApiResponse extends Array<CategoryApi> {
    [index: number]: CategoryApi;
}
