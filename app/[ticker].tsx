import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, View, FlatList } from "react-native";
import { Text } from "react-native-paper";

//new import
import { LineChart, BarChart } from "react-native-gifted-charts";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native";
import { selectStock } from "@/utils/searchStocks";
import { selectStockPrices } from "@/utils/searchStocks";
import { formatCurrency } from "@/utils/formatCurrency";

export default function TickerScreen() {
  const { ticker } = useLocalSearchParams();
  const stock = selectStock(ticker as string);
  const stockPrices = selectStockPrices(ticker as string);

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 20, marginBottom: 10 }}>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 25,
          justifyContent: "space-between",
        }}
      >
        <Pressable onPress={() => router.back()}>
          <MaterialCommunityIcons
            naem="chevron-left"
            color={"white"}
            size={40}
          ></MaterialCommunityIcons>
        </Pressable>
        <Pressable>
          <MaterialCommunityIcons
            naem="star-outline"
            color={"white"}
            size={40}
          ></MaterialCommunityIcons>{" "}
        </Pressable>
      </View>
      {stock ? (
        <FlatList
          data={[1]}
          renderItem={() => (
            <View>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={stock.image}
                  style={{ height: 50, width: 50 }}
                  contentFit="contain"
                />
                <View style={{ paddingLeft: 20 }}>
                  <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
                    {stock.ticker}
                  </Text>
                  <Text variant="labelMedium">{stock.companyName} </Text>
                </View>
                <View style={{ paddingTop: 20 }}>
                  <Text>{stock.price}</Text>

                  <Text variant="headlineLarge" style={{ fontWeight: "bold" }}>
                    {formatCurrency(stock.price)}
                  </Text>
                  <Text
                    variant="labelLarge"
                    style={{
                      color:
                        stock.priceChange < 0
                          ? "red"
                          : stock.priceChange > 0
                          ? "lightgreen"
                          : "auto",
                    }}
                  >
                    {stock.priceChange} {stock.priceChangePercentage.toFixed(2)}
                    %
                  </Text>
                </View>
                <View style={{ paddingTop: 20 }}></View>
              </View>
            </View>
          )}
        />
      ) : (
        <Text>Stock not available </Text>
      )}
    </SafeAreaView>
  );
}
