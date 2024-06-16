import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { PaperProvider, TextInput } from "react-native-paper";

import { useColorScheme } from "@/components/useColorScheme";
import { theme } from "@/theme";
import { createContext } from "react";
import { SearchableStock } from "@/data";
import { searchStocks } from "@/utils/searchStocks";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

//StoreContext Creawte context
export const StoreContext = createContext<{
  searchQuery: string;
  setSearchQuery: (text: string) => void;
  searchedStocks: SearchableStock[];
  setSearchedStocks: (stocks: SearchableStock[]) => void;
}>({
  searchQuery: "",
  setSearchQuery: () => {},
  searchedStocks: [],
  setSearchedStocks: () => {},
});

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedStocks, setSearchedStocks] = useState<SearchableStock[]>([]);

  return (
    <PaperProvider theme={theme}>
      <ThemeProvider value={DarkTheme}>
        <StoreContext.Provider
          value={{
            searchQuery,
            setSearchQuery,
            searchedStocks,
            setSearchedStocks,
          }}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="(search)"
              options={{
                headerTitle: () => (
                  <TextInput
                    mode="outlined"
                    placeholder="Search Stocks..."
                    dense
                    style={{ width: "88%" }}
                    onChangeText={(text: string) => {
                      setSearchQuery(text);
                      const stocks = searchStocks(text);
                      setSearchedStocks(stocks);
                    }}
                  />
                ),
              }}
            />

            <Stack.Screen name="[ticker]" options={{ headerShown: false }} />
          </Stack>
        </StoreContext.Provider>
      </ThemeProvider>
    </PaperProvider>
  );
}
