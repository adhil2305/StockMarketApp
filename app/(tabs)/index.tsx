import { FlatList, StyleSheet, View } from "react-native";
import { Pressable } from "react-native";
import { router } from "expo-router";
import { Text } from "react-native-paper";
import { stocks } from "@/data";
import { Image } from "expo-image";
import { useWindowDimensions } from "react-native";
import { formatCurrency } from "@/utils/formatCurrency";
import { StockCard } from "@/components/StockCard";

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  return (
    <View style={{ flex: 1, paddingTop: 30 }}>
      <Text
        variant="titleLarge"
        style={{ fontWeight: "bold", marginLeft: 5, marginBottom: 5 }}
      >
        Available Stocks
      </Text>
      <FlatList
        keyExtractor={(item) => item.ticker}
        data={stocks}
        renderItem={({ item }) => (
          <StockCard
            companyName={item.companyName}
            image={item.image}
            price={item.price}
            priceChange={item.priceChange}
            priceChangePercentage={item.priceChangePercentage}
            ticker={item.ticker}
          />
        )}
      />
    </View>
  );
}
