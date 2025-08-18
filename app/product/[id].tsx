import { getProductById, Carousel, DimensionSection, QuantityBottomSheet, ReviewSection, getDiscountedPrice } from "@/features/products";
import { MessageBox, Spinner } from "@/shared/components";
import BottomSheet from "@gorhom/bottom-sheet";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function ProductDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [quantity, setQuantity] = useState(1);
    const bottomSheetRef = useRef<BottomSheet>(null);

    const {
        data: product,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductById(id),
        enabled: !!id,
    });

    const handleConfirm = useCallback(() => {
        Alert.alert("Hi there!", `Thanks for testing this app`, [
            {
                text: "Cancel",
                style: "cancel",
            },
            {
                text: "OK",
                onPress: () => {
                    bottomSheetRef.current?.close();
                },
            },
        ]);
    }, []);

    if (isLoading) {
        return <Spinner withOverlay />;
    }

    if (isError || !product) {
        return (
            <View style={styles.center}>
                <MessageBox
                    type="error"
                    message="Error loading product details. Please try again."
                />
            </View>
        );
    }

    return (
        <>
            <Stack.Screen options={{ title: product.title }} />
            <ScrollView contentContainerStyle={styles.container}>
                <Carousel uris={product.images} />

                <Text style={styles.title}>{product.title}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>
                        $
                        {getDiscountedPrice(
                            product.price,
                            product.discountPercentage
                        ).toFixed(2)}
                    </Text>
                    <Text style={styles.priceLined}>${product.price}</Text>
                </View>
                <Text style={styles.description}>{product.description}</Text>

                <View style={styles.ratingContainer}>
                    <Text style={styles.ratingValue}>
                        {product.rating.toFixed(1)}
                    </Text>
                    <Text style={styles.stars}>
                        {"★".repeat(Math.round(product.rating))}
                        {"☆".repeat(5 - Math.round(product.rating))}
                    </Text>
                    <Text style={styles.ratingCount}>
                        ({product.reviews.length})
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.buyButton}
                    onPress={() => bottomSheetRef.current?.expand()}
                >
                    <Text style={styles.buyText}>Add to Cart</Text>
                </TouchableOpacity>

                <View style={{ alignItems: "center", marginTop: 8 }}>
                    {product.brand ? (
                        <Text style={styles.brand}>Brand: {product.brand}</Text>
                    ) : null}
                    <Text
                        style={[
                            styles.stock,
                            {
                                color:
                                    product.stock > 0 ? "#007700" : "#b00020",
                            },
                        ]}
                    >
                        {product.stock > 0
                            ? `In stock: ${product.stock}`
                            : "Out of stock"}
                    </Text>
                </View>

                <DimensionSection dimensions={product.dimensions} />

                <Text style={styles.returnPolicyTitle}>Return Policy</Text>
                <Text style={styles.returnPolicy}>{product.returnPolicy}</Text>

                <ReviewSection reviews={product.reviews} />
            </ScrollView>

            <QuantityBottomSheet
                bottomSheetRef={bottomSheetRef}
                product={product}
                quantity={quantity}
                setQuantity={setQuantity}
                handleConfirm={handleConfirm}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        backgroundColor: "#fff",
        paddingBottom: 40,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#222",
        textAlign: "center",
    },
    brand: {
        fontSize: 14,
        color: "#666",
        marginBottom: 4,
    },
    priceContainer: {
        flexDirection: "row",
        alignItems: "baseline",
        justifyContent: "center",
        gap: 4,
        marginVertical: 16,
    },
    price: {
        fontSize: 28,
        fontWeight: "600",
        color: "#111",
        textAlign: "center",
    },
    priceLined: {
        color: "#666",
        fontSize: 14,
        textDecorationLine: "line-through",
    },
    stock: {
        fontSize: 14,
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        color: "#666",
        lineHeight: 22,
        textAlign: "center",
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 8,
    },
    ratingValue: {
        fontSize: 14,
        color: "#333",
        marginRight: 4,
    },
    stars: {
        fontSize: 14,
        color: "#f5a623",
        marginRight: 4,
    },
    ratingCount: {
        fontSize: 12,
        color: "#666",
    },
    buyButton: {
        backgroundColor: "#131313",
        paddingVertical: 14,
        borderRadius: 16,
        alignItems: "center",
        elevation: 4,
        shadowColor: "#131313",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        marginVertical: 16,
    },
    buyText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },
    returnPolicyTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: "#222",
    },
    returnPolicy: {
        color: "#666",
        marginTop: 8,
        paddingBottom: 16,
    },
});
