import { useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "../components/home/HomeHeader";
import HomeSpotCard from "../components/home/HomeSpotCard";
import SearchBarComponent from "../components/home/SearchBarComponent";
import { FlatList, Pressable, Text, View } from "react-native";
import HomeSpotTabs from "../components/home/HomeSpotTabs";
import { useAuthStore } from "../store/authStore";
import { useFavsStore } from "../store/favoritesStore";
import SurfRulesCard from "../components/home/SurfRulesCard";
import { getSpots, updateSpotConditions } from "../services/spotsService";
import * as Location from "expo-location";
import { getDistance } from "../utils/distance";
import { degreesToCardinal } from "../utils/degreesToCardinal";

export default function Index() {
  const [userLocation, setUserLocation] = useState<any>(null);
  const { signOut } = useAuthStore();
  const [spots, setSpots] = useState<any[]>([]);
  const { getFavs, favs } = useFavsStore();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<"nearby" | "favs">("nearby");
  const [search, setSearch] = useState("");

  const sortedSpots = useMemo(() => {
    if (!userLocation) return spots;
    return [...spots].sort(
      (a, b) =>
        Number(
          getDistance(
            userLocation.latitude,
            userLocation.longitude,
            a.lat,
            a.lng,
          ),
        ) -
        Number(
          getDistance(
            userLocation.latitude,
            userLocation.longitude,
            b.lat,
            b.lng,
          ),
        ),
    );
  }, [userLocation, spots]);

  const filterSpot = sortedSpots.filter((spot) =>
    spot.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
  );


  useEffect(() => {
    Location.requestForegroundPermissionsAsync().then(({ status }) => {
      if (status === "granted") {
        Location.getCurrentPositionAsync().then((location) => {
          setUserLocation(location.coords);
        });
      }
    });

    updateSpotConditions();

    getSpots().then((data) => {
      setSpots(data);
    });

    getFavs();
  }, []);


  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* HEADER */}
      <HomeHeader />

      {/* BUSCADOR */}
      <SearchBarComponent onSearch={setSearch} />

      <View className="h-[2px] bg-gray-300 mx-16 my-6 w-75" />

      <SurfRulesCard />

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
              distance={item.location}
              swellHeight={item.spot_conditions?.swell_height}
              swellPeriod={item.spot_conditions?.swell_period}
              image={
                item.image_url
                  ? { uri: item.image_url }
                  : require("../../assets/images/beach/ave_generic.webp")
              }
              waveHeight={item.spot_conditions?.wave_height}
              wind={item.spot_conditions?.wind_speed}
              direction={degreesToCardinal(
                item.spot_conditions?.wind_direction ?? 0,
              )}
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
                distance={item.location}
                image={
                  item.image_url
                    ? { uri: item.image_url }
                    : require("../../assets/images/beach/ave_generic.webp")
                }
                waveHeight={item.spot_conditions?.wave_height}
                wind={item.spot_conditions?.wind_speed}
                swellHeight={item.spot_conditions?.swell_height}
                swellPeriod={item.spot_conditions?.swell_period}
                direction={degreesToCardinal(
                  item.spot_conditions?.wind_direction ?? 0,
                )}
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
