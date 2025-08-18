import React from "react";
import {
    ActivityIndicator,
    ColorValue,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
} from "react-native";

interface SpinnerProps {
    color?: ColorValue;
    overlayStyle?: StyleProp<ViewStyle>;
    withOverlay?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({
    color = "indigo",
    withOverlay,
    overlayStyle,
}) => {
    const content = <ActivityIndicator color={color} />;

    if (!withOverlay) {
        return content;
    }

    return (
        <View
            style={{
                ...styles.overlay,
                ...(overlayStyle as object),
            }}
        >
            {content}
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 50,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
});

export default Spinner;
