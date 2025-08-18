import SkeletonText from "@/shared/components/feedback/SkeletonText";
import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const ProductItemSkeleton: React.FC = () => {
    return (
        <Animated.View style={styles.item} entering={FadeIn} exiting={FadeOut}>
            <SkeletonText height={128} width={128} />
            <View style={styles.info}>
                <SkeletonText height={16} />
                <SkeletonText height={16} width={"20%"} />
                <SkeletonText height={16} width={"75%"} />

                <View style={styles.shippingInfo}>
                    <SkeletonText height={16} width={"75%"} />
                </View>
            </View>
        </Animated.View>
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
    info: { marginLeft: 12, flex: 1, gap: 8 },
    shippingInfo: {
        position: "absolute",
        bottom: 12,
    },
});

export default ProductItemSkeleton;
