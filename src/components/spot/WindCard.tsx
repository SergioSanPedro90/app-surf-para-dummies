import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";

interface WindCardProp {
  wind: number;
  direction: string;
  windMax: number;
}

const WindCard = ({ wind, direction, windMax }: WindCardProp) => {
  return (

    <View
      className="mx-4 mt-4 bg-white rounded-3xl overflow-hidden border-l-4 border-blue-400"
      style={{
        borderWidth: 0.1,
        elevation: 3,
      }}
    >
      
      {/* HEADER */}
      <View className="bg-gray-100 px-5 py-4 flex-row items-center gap-2">
        <Text style={{ fontSize: 20 }}>💨</Text>
        <Text className="font-bold text-slate-800 text-lg">Viento</Text>
      </View>

      {/* MAIN */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <View>
          <Text className="text-5xl font-bold text-slate-800">{wind}</Text>
          <Text className="text-gray-400">km/h</Text>
        </View>
        <View className="p-4">
          <Text className="text-5xl h-16">
            🧭
          </Text>
        </View>
        {/* <Ionicons name="compass" size={80} color="#e2e8f0" /> */}
        <View className="items-center">
          <Text className="text-5xl font-bold text-slate-800">{direction}</Text>
          <Text className="text-gray-400">Dirección</Text>
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
