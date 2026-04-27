import { useEffect, useState } from "react";
import { getSurfData } from "../services/stormgalss";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "../components/HomeHeader";
import HomeSpotCard from "../components/HomeSpotCard";
import SearchBarComponent from "../components/SearchBarComponent";
import { FlatList, Pressable, Text, View } from "react-native";

const spots = [
  {
    id: 1,
    name: "La Arena",
    distance: "7 km",
    image: require("../../assets/images/beach/la_arena.webp"),
    waveHeight: 1.2,
    wind: 12,
    direction: "NO",
    power: "Media",
  },
  {
    id: 2,
    name: "Sopelana",
    distance: "15 km",
    image: require("../../assets/images/beach/sopelana.webp"),
    waveHeight: 1.5,
    wind: 18,
    direction: "NO",
    power: "Alta",
  },
  {
    id: 3,
    name: "Mundaka",
    distance: "35 km",
    image: require("../../assets/images/beach/mundaka.webp"),
    waveHeight: 2.1,
    wind: 10,
    direction: "N",
    power: "Alta",
  },
  {
    id: 4,
    name: "Zarautz",
    distance: "55 km",
    image: require("../../assets/images/beach/zarautz.webp"),
    waveHeight: 0.8,
    wind: 22,
    direction: "O",
    power: "Baja",
  },
  {
    id: 5,
    name: "Somo",
    distance: "45 km",
    image: require("../../assets/images/beach/somo.webp"),
    waveHeight: 1.0,
    wind: 15,
    direction: "NO",
    power: "Media",
  },
];

export default function Index() {
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"nearby" | "favs">("nearby");

  useEffect(() => {
    getSurfData().then((result) => setData(result.hours[0]));
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* HEADER */}
      <HomeHeader />

      {/* BUSCADOR */}
      <SearchBarComponent />

      {/* TABS */}
      <View className="flex justify-center items-center mt-6">
        <Text className="text-3xl font-bold">SPOTS</Text>

        <View className="flex-row mt-4 gap-24">
          <Pressable onPress={() => setActiveTab("nearby")}>
            <Text
              className={`text-center font-bold text-base ${activeTab === "nearby" ? "text-black text-lg" : "text-gray-500"}`}
            >
              Cercanos
            </Text>
            <View
              className={`h-[3px] mt-1 rounded-full w-32 ${activeTab === "nearby" ? "bg-blue-400" : "bg-transparent"}`}
            />
          </Pressable>

          <Pressable onPress={() => setActiveTab("favs")}>
            <Text
              className={`text-center font-bold text-base ${activeTab === "favs" ? "text-black text-lg" : "text-gray-500"}`}
            >
              Favoritos
            </Text>
            <View
              className={`h-[3px] mt-1 rounded-full w-32 ${activeTab === "favs" ? "bg-blue-400" : "bg-transparent"}`}
            />
          </Pressable>
        </View>
      </View>

      {activeTab === "nearby" ? (
        <FlatList
          className="mt-4"
          data={spots}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <HomeSpotCard
              name={item.name}
              distance={item.distance}
              image={item.image}
              waveHeight={item.waveHeight}
              wind={item.wind}
              direction={item.direction}
              power={item.power}
            />
          )}
        />
      ) : (
        <Text className="text-center mt-6 text-red-600 font-bold text-xl">
          Inicia sesión para ver favoritos
        </Text>
      )}
    </SafeAreaView>
  );
}
