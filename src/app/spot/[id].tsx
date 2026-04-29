import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import SpotCard from "@/src/components/SpotCard";
import { spots } from "@/src/constants/spotsData";

export default function SpotDetail() {
  const { id } = useLocalSearchParams();
  
  const spot = spots.find(s => s.id === Number(id));

  if (!spot) return <Text>Spot no encontrado</Text>;

  return (
    <View className="flex-1 bg-white">
      <SpotCard
        wavePeriod={spot.wavePeriod}
        name={spot.name}
        waveHeight={spot.waveHeight}
        wind={spot.wind}
        direction={spot.direction}
        power={spot.power}
      />
    </View>
  );
}