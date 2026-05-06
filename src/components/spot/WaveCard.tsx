import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";

interface WaveCardProps {
  waveHeight: number;
  wavePeriod: number;
  swellHeight: number;
  swellPeriod: number;
}

const WaveCard = ({
  waveHeight,
  wavePeriod,
  swellHeight,
  swellPeriod,
}: WaveCardProps) => {
  const wavePower = (swellHeight: number, swellPeriod: number) => {
    const power = 0.5 * swellHeight * swellHeight * swellPeriod;
  
    if (power < 10) return "Baja";
    if (power < 20) return "Media";
    return "Alta";
  };

  return (
    <View
      className="mx-4 mt-4 bg-white rounded-3xl overflow-hidden"
      style={{
        borderWidth: 0.5,
        borderColor: "#e5e7eb",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      {/* HEADER */}
      <View className="bg-slate-800 px-5 py-4 flex-row justify-between items-center">
        <View className="flex-row items-center gap-2">
          <Ionicons name="water" size={20} color="#60a5fa" />
          <Text className="font-bold text-white text-lg">Oleaje</Text>
        </View>
      </View>

      {/* WAVE HEIGHT */}
      <View className="py-6 items-center">
        <Text className="text-6xl font-bold text-slate-800">{waveHeight}</Text>
        <Text className="text-slate-400 text-lg">metros</Text>
      </View>

      {/* STATS */}
      <View className="flex-row border-t border-gray-100">
        <View className="flex-1 items-center py-4 border-r border-gray-100">
          <Text className="text-xs text-gray-400 mb-1">Período</Text>
          <Text className="text-lg font-bold text-slate-800">
            {wavePeriod} s
          </Text>
        </View>
        <View className="flex-1 items-center py-4 border-r border-gray-100">
          <Text className="text-xs text-gray-400 mb-1">Fuerza</Text>
          <Text className="text-lg font-bold text-slate-800">
            {wavePower(swellHeight, swellPeriod)}
          </Text>
        </View>
        <View className="flex-1 items-center py-4">
          <Text className="text-xs text-gray-400 mb-1">Dirección</Text>
          <Text className="text-lg font-bold text-slate-800">NO</Text>
        </View>
      </View>
    </View>
  );
};
export default WaveCard;
