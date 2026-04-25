import { View, Text } from "react-native";

interface Stats {
  text: string;
  stat: string;
}

const StatsBox = ({ text, stat }: Stats) => {
  return (
    <View className="items-center justify-center bg-gray-100 rounded-xl p-3 w-[48%] h-24">
      <Text className="text-md text-gray-500">{text}</Text>
      <Text className="text-xl font-bold">{stat}</Text>
    </View>
  );
};
export default StatsBox;


