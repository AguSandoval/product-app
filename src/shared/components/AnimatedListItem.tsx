import React, { useEffect } from "react";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming,
} from "react-native-reanimated";

interface AnimatedListItemProps {
    children: React.ReactNode;
    index: number;
    delay?: number;
    itemId?: string | number;
}

export const AnimatedListItem: React.FC<AnimatedListItemProps> = ({
    children,
    index,
    delay = 50,
    itemId,
}) => {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(50);

    useEffect(() => {
        opacity.value = 0;
        translateY.value = 50;

        const shouldUseReducedDelay = index > 8;
        const finalDelay = shouldUseReducedDelay ? 50 : index * delay;

        opacity.value = withDelay(finalDelay, withTiming(1, { duration: 500 }));

        translateY.value = withDelay(
            finalDelay,
            withSpring(0, {
                damping: 18,
                stiffness: 100,
                mass: 0.8,
            })
        );
    }, [itemId, index]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{ translateY: translateY.value }],
        };
    });

    return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};
