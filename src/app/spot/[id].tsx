import { View, Text, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { spots } from "@/src/constants/spotsData";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import SpotCard from "@/src/components/spot/SpotCard";
import WaveCard from "@/src/components/spot/WaveCard";
import WindCard from "@/src/components/spot/WindCard";

export default function SpotDetail() {
  const { id } = useLocalSearchParams();

  const spot = spots.find((s) => s.id === Number(id));

  if (!spot) return <Text>Spot no encontrado</Text>;

  return (
    <SafeAreaView className="flex-1 bg-white">

      {/* HEADER */}
      <View className="p-4">
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <View className="p-2">
          <Text className="font-bold text-3xl">{spot.name}</Text>
          <Text className="text-gray-400 mt-1">Miércoles, 29 Abril</Text>
        </View>
      </View>

      <WaveCard waveHeight={spot.waveHeight} wavePeriod={spot.wavePeriod} power={spot.power}/>
      
      <WindCard wind={spot.wind} direction={spot.direction}/>
      

      {/* <View className="flex-1 bg-white">
        <SpotCard
          wavePeriod={spot.wavePeriod}
          name={spot.name}
          waveHeight={spot.waveHeight}
          wind={spot.wind}
          direction={spot.direction}
          power={spot.power}
        />
      </View> */}
    </SafeAreaView>
  );
}
