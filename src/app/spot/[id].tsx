import { View, Text, Pressable, ScrollView, Modal, Linking } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import WaveCard from "@/src/components/spot/WaveCard";
import WindCard from "@/src/components/spot/WindCard";
import { useFavsStore } from "@/src/store/favoritesStore";
import { useEffect, useState } from "react";
import { getSpots } from "@/src/services/spotsService";
import TempCard from "@/src/components/spot/TempCard";
import { useAuthStore } from "@/src/store/authStore";

export default function SpotDetail() {
  const { user } = useAuthStore()
  const { addFav, removeFav, favs } = useFavsStore();
  const { id } = useLocalSearchParams();
  const [spot, setSpot] = useState<any>(null);
  const [isFav, setIsFav] = useState(favs.includes(spot?.id ?? 0));
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("bg-blue-400");

  const today = new Date();
  const dateNow = today.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  useEffect(() => {
    getSpots().then((data) => {
      const found = data.find((s: any) => s.id === Number(id));
      setSpot(found);
      if (found) setIsFav(favs.includes(found.id));
    });
  }, [id]);

  const handleFav = () => {
    if (!spot) return;

    if (!user) {
  setMessage("Inicia sesión para guardar favoritos");
  setMessageColor("bg-red-400");
  setTimeout(() => setMessage(""), 2000);
  return;
}

    if (isFav) {
      removeFav(spot.id);
      setMessage("Eliminado de favoritos");
      setIsFav(false);
    } else {
      addFav(spot.id);
      setMessage("Añadido a favoritos");
      setIsFav(true);
    }
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const degreesToCardinal = (degrees: number) => {
    const cardinals = ["N", "NE", "E", "SE", "S", "SO", "O", "NO"];
    const index = Math.round(degrees / 45) % 8;
    return cardinals[index];
  };

 
  if (!spot)
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Cargando...</Text>
      </View>
    );

  return (
    <SafeAreaView className="flex-1 bg-gray-150">
      {/* HEADER */}
      <View className="p-4">
        <View className="flex-row justify-between items-center">
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
          <View className="flex-row gap-4">
            <Pressable onPress={handleFav}>
              <Ionicons
                name={favs.includes(spot.id) ? "heart" : "heart-outline"}
                size={24}
                color={favs.includes(spot.id) ? "red" : "black"}
              />
            </Pressable>

            <Pressable onPress={() => spot.webcam_url && Linking.openURL(spot.webcam_url)}>
              <Ionicons name="videocam-outline" size={24} color="black" />
            </Pressable>
            <Pressable  onPress={() => Linking.openURL(`https://maps.google.com/?q=${spot.lat},${spot.lng}`)}>
              <Ionicons name="map-outline" size={24} color="black" />
            </Pressable>
          </View>
        </View>

        <View className="p-2">
          <Text className="font-bold text-3xl">{spot.name}</Text>
          <Text className="text-gray-400 text-md">{spot.location}</Text>
          <Text className="mt-1 capitalize text-blue-400">{dateNow}</Text>
          
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        <TempCard
          rainProb={spot.spot_conditions?.rain_prob}
          airTemp={spot.spot_conditions?.air_temp}
          spotName={spot.name}
          waterTemp={spot.spot_conditions?.water_temp}
        />

        <WaveCard
          waveHeightMax={spot.spot_conditions?.wave_height_max}
          waveDirection={degreesToCardinal(
            spot.spot_conditions?.wave_direction ?? 0,
          )}
          swellPeriod={spot.spot_conditions?.swell_period}
          swellHeight={spot.spot_conditions?.swell_height}
          waveHeight={spot.spot_conditions?.wave_height}
          wavePeriod={spot.spot_conditions?.wave_period}
        />
        <WindCard
          windMax={spot.spot_conditions?.wind_gusts}
          wind={spot.spot_conditions?.wind_speed}
          direction={degreesToCardinal(
            spot.spot_conditions?.wind_direction ?? 0,
          )}
        />
        <View className="h-10" />
      </ScrollView>

      {message !== "" && (
        <Modal visible={message !== ""} transparent animationType="fade">
          <View className="flex-1 justify-end pb-10 items-center">
            <View className={`${messageColor} px-6 py-3 rounded-full`}>
              <Text className="text-white font-bold">{message}</Text>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}
