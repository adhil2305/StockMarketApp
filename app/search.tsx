import { useContext } from "react";
import { Text } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import { TextInput } from "react-native";
import { View } from "react-native";
import { StoreContext } from "./_layout";
import { FlatList } from "react-native";
import { StockCard } from "@/components/StockCard";
export default function SearchScreen() {
  const { searchQuery, searchedStocks } = useContext(StoreContext);
  if (!searchQuery && searchedStocks.length === 0)
    return (
      <View style={styles.container}>
        <text fontVariant="titleLarge" style={{ fontWeight: "bold" }}>
          Search Stocks
        </text>
      </View>
    );

  if (searchQuery && searchedStocks.length === 0)
    return (
      <View style={styles.container}>
        <text fontVariant="titleLarge" style={{ fontWeight: "bold" }}>
          No Stocks Available
        </text>
      </View>
    );

  return (
    <FlatList
      data={searchedStocks}
      keyExtractor={(item) => item.ticker}
      renderItem={({ item }) => <StockCard {...item} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
