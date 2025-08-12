import React from "react";
import { StyleSheet, View } from "react-native";
import SortButton from "./SortButton";

type SortOption =
    | "price_asc"
    | "price_desc"
    | "rating_asc"
    | "rating_desc"
    | null;

interface Props {
    sortOption: SortOption;
    onChangeSort: (option: SortOption) => void;
}

export function ProductSortControls({ sortOption, onChangeSort }: Props) {
    function renderButton(label: string, option: SortOption) {
        const active = sortOption === option;
        return (
            <SortButton
                key={option}
                label={label}
                active={active}
                onPress={() => onChangeSort(active ? null : option)}
            />
        );
    }

    return (
        <View style={styles.container}>
            {renderButton("Price ↑", "price_asc")}
            {renderButton("Price ↓", "price_desc")}
            {renderButton("Rating ↑", "rating_asc")}
            {renderButton("Rating ↓", "rating_desc")}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingVertical: 8,
    },
    button: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        backgroundColor: "#eee",
    },
    buttonActive: {
        backgroundColor: "#2C0755",
    },
    text: {
        color: "#333",
    },
    textActive: {
        color: "#fff",
    },
});
