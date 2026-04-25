import { View, Text } from "react-native";
import StatsBox from "./StatsBox";

interface SpotCardProps {
  waveHeight: number;
  wavePeriod: number;
  windSpeed: number;
}

const SpotCard = ({ waveHeight, wavePeriod, windSpeed }: SpotCardProps) => {
  return (
    <View className="bg-slate-300 p-10">
      {/* HEADER */}
      <View className="bg-blue-500 p-2 rounded-t-3xl flex-row justify-between items-center">
        <View className="p-3 gap-1">
          <Text className="font-bold text-2xl">La arena</Text>
          <Text>Muskiz, Pais Vasco</Text>
        </View>
        <View className="bg-green-600 p-3 rounded-3xl mx-2">
          <Text className="text-center">- Buena</Text>
        </View>
      </View>

      {/* BODY */}
      <View className="bg-white rounded-b-3xl p-3 overflow-hidden">
        {/* STATS */}
        <View className="flex-row flex-wrap gap-3 py-4">
          <StatsBox text="Ola" stat={`${waveHeight}m`} />
          <StatsBox text="Período" stat={`${wavePeriod}s`} />
          <StatsBox text="Viento" stat={`${windSpeed}km/h`} />
          <StatsBox text="Dirección" stat="NO" />
        </View>

        {/* LINEA */}
        <View className="h-[1px] bg-gray-300 mx-1 mb-2" />

        {/* FOOTER */}
        <View className="flex-row justify-between items-center px-1 py-2">
          <Text className="text-xs text-gray-400">Actualizado hace 1h</Text>
          <View className="flex-row items-center gap-1">
            <View className="w-2 h-2 rounded-full bg-red-400" />
            <Text className="text-xs text-gray-400">Sin webcam</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default SpotCard;
