import { View, Text } from "react-native";

interface TempCardProps {
  waterTemp: number;
  airTemp: number;
  rainProb: number;
  spotName: string;
}

const TempCard = ({ waterTemp, airTemp, rainProb, spotName }: TempCardProps) => {
  return (
    <View className="mx-4 mt-4 bg-white rounded-3xl overflow-hidden border-l-4 border-blue-400"
      style={{ borderWidth: 0.1, elevation: 3 }}>
      
      <View className="bg-gray-100 px-5 py-2 flex-row items-center gap-2">
        <Text style={{ fontSize: 20 }}>🌡️</Text>
        <Text className="font-bold text-slate-800 text-lg">Condiciones</Text>
      </View>

      <View className="p-5">
        <Text className="text-gray-600 text-base leading-6">
          Hoy en <Text className="font-bold text-slate-800">{spotName}</Text> el agua está a{' '}
          <Text className="font-bold text-slate-800">{waterTemp}°C</Text>, la temperatura ambiente es de{' '}
          <Text className="font-bold text-slate-800">{airTemp}°C</Text> y hay un{' '}
          <Text className="font-bold text-slate-800">{rainProb}%</Text> de probabilidad de lluvia.
        </Text>
      </View>

    </View>
  );
};
export default TempCard;