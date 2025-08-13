import { getProductById } from "@/api/products/services";
import Spinner from "@/components/Spinner";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams } from "expo-router";

import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ProductDetailScreen() {
    const { id, title } = useLocalSearchParams<{ id: string; title: string }>();

    const {
        data: product,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductById(id),
        enabled: !!id,
    });

    if (isLoading) {
        return <Spinner withOverlay />;
    }

    if (isError || !product) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>
                    Error loading product. Please try again.
                </Text>
            </View>
        );
    }

    return (
        <>
            <Stack.Screen options={{ title }} />
            <ScrollView contentContainerStyle={styles.container}>
                <Image
                    source={product.thumbnail}
                    style={styles.image}
                    contentFit="contain"
                    transition={{
                        duration: 100,
                        timing: "ease-in-out",
                        effect: "cross-dissolve",
                    }}
                />
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.brand}>Marca: {product.brand}</Text>
                <Text style={styles.price}>Precio: ${product.price}</Text>
                <Text style={styles.stock}>
                    {product.stock > 0
                        ? `En stock: ${product.stock}`
                        : "Sin stock"}
                </Text>
                <Text style={styles.description}>{product.description}</Text>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#fff",
    },
    loading: {
        marginTop: 40,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    errorText: {
        color: "#b00020",
        fontSize: 16,
    },
    image: {
        width: "100%",
        height: 300,
        borderRadius: 8,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 8,
    },
    brand: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 4,
    },
    price: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 4,
    },
    stock: {
        fontSize: 16,
        marginBottom: 12,
        color: "#007700",
    },
    description: {
        fontSize: 16,
        color: "#444",
    },
});
