import { Product } from "@/api/products/mapper";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ProductItemProps {
    product: Product;
}

export const getDiscountedPrice = (price: number, discountPercentage: number) =>
    price - price * (discountPercentage / 100);

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
    const priceWithoutDiscount = getDiscountedPrice(
        product.price,
        product.discountPercentage
    );

    if (!product.stock) return null;

    return (
        <TouchableOpacity
            style={styles.item}
            activeOpacity={0.7}
            onPress={() =>
                router.push({
                    pathname: `/product/[id]`,
                    params: {
                        id: product.id.toString(),
                        title: product.title || "",
                    },
                })
            }
        >
            <Image
                source={product.thumbnail}
                style={styles.thumbnail}
                contentFit="contain"
                transition={{
                    duration: 100,
                    timing: "ease-in-out",
                    effect: "cross-dissolve",
                }}
            />
            <View style={styles.info}>
                <Text numberOfLines={2} style={styles.title}>
                    {product.title}
                </Text>
                <Text style={styles.priceLined}>${product.price}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>
                        ${priceWithoutDiscount.toFixed(2)}
                    </Text>
                    <Text style={styles.discount}>
                        {product.discountPercentage.toFixed(0)}% OFF
                    </Text>
                </View>
                <Text style={styles.shippingInfo}>
                    🚛 {product.shippingInformation}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        padding: 12,
        justifyContent: "center",
        margin: 8,
        borderRadius: 16,
        backgroundColor: "#fff",
        shadowColor: "#131313",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 1,
    },
    thumbnail: {
        width: 128,
        height: 128,
        borderRadius: 8,
        backgroundColor: "#f0f0f0",
    },
    info: { marginLeft: 12, flex: 1 },
    title: { fontSize: 16, fontWeight: "400" },
    priceContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        fontSize: 14,
    },
    priceLined: {
        color: "#666",
        fontSize: 12,
        textDecorationLine: "line-through",
        marginTop: 8,
    },
    price: { color: "#131313", fontSize: 20, fontWeight: 500 },
    discount: {
        color: "#00a650",
        fontSize: 14,
    },
    shippingInfo: {
        color: "#00a650",
        fontSize: 14,
        position: "absolute",
        bottom: 12,
    },
    stockBadge: {
        backgroundColor: "#00a650",
        color: "#fff",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        fontSize: 12,
    },
});

export default ProductItem;
