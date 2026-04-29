import { useEffect, useState } from "react";
import { getSurfData } from "../services/stormgalss";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "../components/HomeHeader";
import HomeSpotCard from "../components/HomeSpotCard";
import SearchBarComponent from "../components/SearchBarComponent";
import { FlatList, Pressable, Text, View } from "react-native";
import HomeSpotTabs from "../components/HomeSpotTabs";
import { spots } from "../constants/spotsData";


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
      <HomeSpotTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* LISTA SPOTS */}
      {activeTab === "nearby" ? (
        <FlatList
          className="mt-4"
          data={spots}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <HomeSpotCard
              id={item.id}
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
