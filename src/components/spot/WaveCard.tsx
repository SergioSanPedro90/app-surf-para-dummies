import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface WaveCardProps {
  waveHeight: number;
  power: string;
  wavePeriod: number;
}

const WaveCard = ({ waveHeight, wavePeriod, power }: WaveCardProps) => {
  return (
    <View className="p-4">
      <View className="bg-blue-300 rounded-3xl p-4 mt-5 opacity-70">

        {/* HEADER */}
        <View className="p-2 flex-row justify-between items-center">
          <Text className="font-bold text-2xl">Info de olas</Text>
          <View className="bg-green-600 p-2 rounded-3xl">
            <Text className="text-center mx-3">- Buena</Text>
          </View>
        </View>

        {/* WAVE HEIGT */}
        <View>
          <Text className="mt-1 text-center text-3xl">{waveHeight} m</Text>
        </View>

        {/* DATA WAVE */}
        <View className="flex-row gap-2 justify-between items-center p-2 mt-3">
          <View>
            <Text>Periodo</Text>
            <Text className="text-center mt-2 text-xl">{wavePeriod}</Text>
          </View>
          <View>
            <Text>Fuerza</Text>
            <Text className="text-center mt-2 text-xl">{power}</Text>
          </View>
          <View>
            <Text>Dirección</Text>
            <Text className="text-center mt-2 text-xl">--</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default WaveCard;
