import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface DimensionSectionProps {
    dimensions: {
        depth: number;
        height: number;
        width: number;
    };
}

const DimensionSection: React.FC<DimensionSectionProps> = ({ dimensions }) => {
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.dimensionsTitle}>Dimensions</Text>
            <Text style={styles.dimensions}>Depth: {dimensions.depth} cm</Text>
            <Text style={styles.dimensions}>
                Height: {dimensions.height} cm
            </Text>
            <Text style={styles.dimensions}>Width: {dimensions.width} cm</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    titleContainer: {
        marginBottom: 16,
    },
    dimensionsTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: "#222",
        marginTop: 16,
    },
    dimensions: {
        color: "#666",
        marginTop: 8,
    },
});

export default DimensionSection;
