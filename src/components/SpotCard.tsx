import { View, Text } from "react-native";

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
        <View className="flex-row flex-wrap gap-2 py-4">
          <View className="items-center bg-gray-100 rounded-xl p-3 w-[48%]">
            <Text className="text-xs text-gray-500">Ola</Text>
            <Text className="text-xl font-bold">{waveHeight}m</Text>
          </View>
          <View className="items-center bg-gray-100 rounded-xl p-3 w-[48%]">
            <Text className="text-xs text-gray-500">Período</Text>
            <Text className="text-xl font-bold">{wavePeriod}s</Text>
          </View>
          <View className="items-center bg-gray-100 rounded-xl p-3 w-[48%]">
            <Text className="text-xs text-gray-500">Viento</Text>
            <Text className="text-xl font-bold">{windSpeed}km/</Text>
          </View>
          <View className="items-center bg-gray-100 rounded-xl p-3 w-[48%]">
            <Text className="text-xs text-gray-500">Dirección</Text>
            <Text className="text-xl font-bold">NO</Text>
          </View>
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
