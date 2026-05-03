import { View, Text, Pressable, ScrollView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { spots } from "@/src/constants/spotsData";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import WaveCard from "@/src/components/spot/WaveCard";
import WindCard from "@/src/components/spot/WindCard";
import { useFavsStore } from "@/src/store/favoritesStore";

export default function SpotDetail() {
  const { addFav, removeFav, favs } = useFavsStore();
  const { id } = useLocalSearchParams();
  const today = new Date();
  const dateNow = today.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const spot = spots.find((s) => s.id === Number(id));

  if (!spot) return <Text>Spot no encontrado</Text>;

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* HEADER */}
      <View className="p-4">
        <View className="flex-row justify-between items-center">
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
          <View className="flex-row gap-4">
            <Pressable
              onPress={() =>
                favs.includes(spot.id) ? removeFav(spot.id) : addFav(spot.id)
              }
            >
              <Ionicons
                name={favs.includes(spot.id) ? "heart" : "heart-outline"}
                size={24}
                color={favs.includes(spot.id) ? "red" : "black"}
              />
            </Pressable>

            <Pressable>
              <Ionicons name="videocam-outline" size={24} color="black" />
            </Pressable>
            <Pressable>
              <Ionicons name="map-outline" size={24} color="black" />
            </Pressable>
          </View>
        </View>

        <View className="p-2">
          <Text className="font-bold text-3xl">{spot.name}</Text>
          <Text className="text-gray-400 mt-1 capitalize">{dateNow}</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <WaveCard
          waveHeight={spot.waveHeight}
          wavePeriod={spot.wavePeriod}
          power={spot.power}
        />
        <WindCard wind={spot.wind} direction={spot.direction} />
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
