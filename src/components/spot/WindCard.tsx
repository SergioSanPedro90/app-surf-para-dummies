import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";

interface WindCardProp {
  wind: number;
  direction: string;
  windMax: number;
}

const WindCard = ({ wind, direction, windMax}: WindCardProp) => {
  return (
    <View className="mx-4 mt-4 bg-white rounded-3xl overflow-hidden"
      style={{ borderWidth: 0.5, borderColor: '#e5e7eb', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 }}>

      {/* HEADER */}
      <View className="bg-slate-800 px-5 py-4 flex-row items-center gap-2">
        <Ionicons name="partly-sunny" size={20} color="#fbbf24" />
        <Text className="font-bold text-white text-lg">Viento</Text>
      </View>

      {/* MAIN */}
      <View className="flex-row items-center justify-between px-6 py-6">
        <View>
          <Text className="text-5xl font-bold text-slate-800">{wind}</Text>
          <Text className="text-gray-400">km/h</Text>
        </View>
        <Ionicons name="compass" size={80} color="#e2e8f0" />
        <View className="items-center">
          <Text className="text-3xl font-bold text-slate-800">{direction}</Text>
          <Text className="text-gray-400">dirección</Text>
        </View>
      </View>

      {/* RACHAS */}
      <View className="border-t border-gray-100 px-6 py-3">
        <Text className="text-xs text-gray-400">Rachas</Text>
        <Text className="text-lg font-bold text-slate-800">{windMax} km/h</Text>
      </View>

    </View>
  );
};
export default WindCard;
