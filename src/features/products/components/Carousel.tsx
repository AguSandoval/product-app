import { Image } from "expo-image";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
    ICarouselInstance,
    Pagination,
} from "react-native-reanimated-carousel";

const width = Dimensions.get("window").width;

interface CarouselProps {
    uris: string[];
}

const CarouselComponent: React.FC<CarouselProps> = ({ uris }) => {
    const ref = React.useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);

    const onPressPagination = (index: number) => {
        ref.current?.scrollTo({
            count: index - progress.value,
            animated: true,
        });
    };

    if (uris.length === 1) {
        return (
            <View style={styles.page}>
                <Image
                    source={{ uri: uris[0] }}
                    style={styles.image}
                    contentFit="contain"
                    transition={{
                        duration: 200,
                        timing: "ease-in-out",
                        effect: "cross-dissolve",
                    }}
                />
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <Carousel
                ref={ref}
                width={width}
                height={width}
                data={uris}
                onProgressChange={progress}
                renderItem={({ item, index }) => (
                    <View style={styles.page} key={index}>
                        <Image
                            source={{ uri: item }}
                            style={styles.image}
                            contentFit="contain"
                            transition={{
                                duration: 200,
                                timing: "ease-in-out",
                                effect: "cross-dissolve",
                            }}
                        />
                    </View>
                )}
            />

            <Pagination.Basic
                progress={progress}
                data={uris}
                dotStyle={{
                    backgroundColor: "rgba(0,0,0,0.2)",
                    borderRadius: 50,
                    width: 6,
                    height: 6,
                }}
                containerStyle={{ gap: 8, marginBottom: 16, marginTop: 8 }}
                onPress={onPressPagination}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 400,
    },
    page: {
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: 400,
        borderRadius: 8,
    },
});

export default CarouselComponent;
