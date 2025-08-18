import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    const queryClient = new QueryClient();

    if (!loaded) return null;

    return (
        <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView>
                <ThemeProvider
                    value={{
                        ...DarkTheme,
                        colors: { ...DarkTheme.colors, background: "#fff" },
                    }}
                >
                    <Stack
                        screenOptions={{
                            headerTintColor: "#131313",
                            headerBackButtonDisplayMode: "minimal",
                            headerStyle: {
                                backgroundColor: "#ffea00",
                            },
                        }}
                    >
                        <Stack.Screen
                            name="index"
                            options={{ title: "Products" }}
                        />
                        <Stack.Screen
                            name="product/[id]"
                            options={{ title: "" }}
                        />
                        <Stack.Screen name="+not-found" />
                    </Stack>
                    <StatusBar style="auto" />
                </ThemeProvider>
            </GestureHandlerRootView>
        </QueryClientProvider>
    );
}
