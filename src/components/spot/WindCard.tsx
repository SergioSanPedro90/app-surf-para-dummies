import { View, Text } from "react-native";

interface WindCardProp {
  wind: number;
  direction: string;
}

const WindCard = ({ wind, direction }: WindCardProp) => {
  return (
    <View className="p-4">
      <View className="bg-blue-300 rounded-3xl p-4 opacity-70">

        {/* HEADER */}
        <View className="p-2 flex-row justify-between items-center">
          <Text className="font-bold text-2xl">Viento</Text>
        </View>

        {/* WIND POWER */}
        <View>
          <Text className="mt-1 text-center text-3xl">{wind} Km/h</Text>
        </View>

        {/* DATA WIND */}
        <View className="flex-row gap-2 justify-between items-center p-2 mt-3">
          <View>
            <Text className="text-center">Rachas</Text>
            <Text className="text-center mt-2 text-xl">40 km/h</Text>
          </View>
          <View>
            <Text>Direccion</Text>
            <Text className="text-center mt-2 text-xl">{direction}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default WindCard;
