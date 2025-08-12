import { getProducts } from "@/api/products/services";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const MainPage = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    });

    if (isLoading)
        return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
    if (isError)
        return <Text style={{ margin: 20 }}>Error al cargar productos</Text>;

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={{ flexDirection: "row", padding: 10 }}>
                    <Image
                        source={{ uri: item.thumbnail }}
                        style={{ width: 60, height: 60 }}
                    />
                    <View style={{ marginLeft: 10 }}>
                        <Text>{item.title}</Text>
                        <Text>${item.price}</Text>
                    </View>
                </View>
            )}
        />
    );
};

export default MainPage;
