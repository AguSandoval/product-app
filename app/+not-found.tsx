import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{ title: "Oops!" }} />
            <View>
                <Text style={styles.container}>
                    {`This screen doesn't exist. You can go back to the`}
                    <Link href="/" style={styles.link}>
                        home screen
                    </Link>
                    .
                </Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
});
