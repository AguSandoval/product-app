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

    images: apiProduct.images,
    availabilityStatus: apiProduct.availabilityStatus,
    discountPercentage: apiProduct.discountPercentage,
    dimensions: apiProduct.dimensions,
    meta: apiProduct.meta,
    minimumOrderQuantity: apiProduct.minimumOrderQuantity,
    returnPolicy: apiProduct.returnPolicy,
    shippingInformation: apiProduct.shippingInformation,
    warrantyInformation: apiProduct.warrantyInformation,
    reviews: apiProduct.reviews,
    sku: apiProduct.sku,
    tags: apiProduct.tags,
    weight: apiProduct.weight,
});

export const mapCategoryFromApi = (apiCategory: CategoryApi): Category => {
    return {
        name: apiCategory.name,
        slug: apiCategory.slug,
        url: apiCategory.url,
    };
};
