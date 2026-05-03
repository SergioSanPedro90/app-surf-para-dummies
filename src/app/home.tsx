import { useEffect, useState } from "react";
import { getSurfData } from "../services/stormgalss";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "../components/home/HomeHeader";
import HomeSpotCard from "../components/home/HomeSpotCard";
import SearchBarComponent from "../components/home/SearchBarComponent";
import { FlatList, Pressable, Text, View } from "react-native";
import HomeSpotTabs from "../components/home/HomeSpotTabs";
import { spots } from "../constants/spotsData";
import { useAuthStore } from "../store/authStore";
import { useFavsStore } from "../store/favoritesStore";
import SurfRulesCard from "../components/home/SurfRulesCard";

export default function Index() {
  const { signOut } = useAuthStore();
  const { getFavs, favs } = useFavsStore();
  const { user } = useAuthStore();
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"nearby" | "favs">("nearby");
  const [search, setSearch] = useState("");

  const filterSpot = spots.filter((spot) =>
    spot.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
  );

  useEffect(() => {
    getSurfData().then((result) => setData(result.hours[0]));
    getFavs();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* HEADER */}
      <HomeHeader />
      
      {/* BUSCADOR */}
      <SearchBarComponent onSearch={setSearch} />

      <View className="h-[2px] bg-gray-300 mx-16 my-6 w-75" />

      <SurfRulesCard/>

      <View className="h-[2px] bg-gray-300 mx-16 mt-6 w-75" />

      {/* TABS */}
      <HomeSpotTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* LISTA SPOTS */}
      {activeTab === "nearby" ? (
        <FlatList
          className="mt-4"
          data={filterSpot}
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
          ListFooterComponent={<View className="h-10" />}
        />
      ) : user ? (
        favs.length > 0 ? (
          <FlatList
            className="mt-4"
            data={spots.filter((s) => favs.includes(s.id))}
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
            ListFooterComponent={<View className="h-10" />}
          />
        ) : (
          <Text className="text-center my-6 text-red-600 font-bold text-xl">
            No tienes aún ningún favorito
          </Text>
        )
      ) : (
        <Text className="text-center mt-6 text-red-600 font-bold text-xl">
          Inicia sesión para ver favoritos
        </Text>
      )}

      <View className="p-4">
        <Pressable
          onPress={() => signOut()}
          className="border border-black rounded-full py-4 items-center"
        >
          <Text className="text-black font-bold text-lg">Cerrar sesión</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
