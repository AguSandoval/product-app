export interface ProductApi {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    stock: number;
    brand: string;
    category: CategoryApi;

    thumbnail: string;
    images: string[];

    availabilityStatus: string;
    discountPercentage: number;

    dimensions: {
        depth: number;
        height: number;
        width: number;
    };

    meta: {
        barcode: string;
        qrCode: string;
        createdAt: string;
        updatedAt: string;
    };

    minimumOrderQuantity: number;

    returnPolicy: string;
    shippingInformation: string;
    warrantyInformation: string;

    reviews: {
        reviewerName: string;
        reviewerEmail: string;
        rating: number;
        comment: string;
        date: string;
    }[];

    sku: string;
    tags: string[];
    weight: number;
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
