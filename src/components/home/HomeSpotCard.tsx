import { router } from "expo-router";
import { View, Text, ImageBackground, Pressable } from "react-native";

interface HomeSpotCardProps {
  id: number;
  name: string;
  distance: string;
  image: any;
  waveHeight: number;
  wind: number;
  direction: string;
  power: string;
}

const HomeSpotCard = ({
  name,
  distance,
  image,
  waveHeight,
  wind,
  direction,
  power,
  id,
}: HomeSpotCardProps) => {
  return (
    <Pressable onPress={() => router.push(`/spot/${id}` as any)}>
      <ImageBackground
        source={image}
        className="mt-4 mx-4 rounded-3xl overflow-hidden"
      >
        <View className="bg-black/30 p-4">
          {/* HEADER */}
          <View className="flex-row justify-between items-center mb-3">
            <View className="flex-row items-center gap-2">
              <Text className="font-bold text-lg text-white">{name}</Text>
            </View>
            <Text className="text-white font-bold ">{distance}</Text>
          </View>

          {/* STATS */}
          <View className="flex-row justify-between mt-2">
            <View className="items-center">
              <Text className="text-xs text-white">Ola</Text>
              <Text className="text-white font-bold">{waveHeight}</Text>
            </View>
            <View className="items-center">
              <Text className="text-xs text-white">Viento</Text>
              <Text className="text-white font-bold">{wind}km/h</Text>
            </View>
            <View className="items-center">
              <Text className="text-xs text-white">Dirección</Text>
              <Text className="text-white font-bold">{direction}</Text>
            </View>
            <View className="items-center">
              <Text className="text-xs text-white">Potencia</Text>
              <Text className="text-white font-bold">{power}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
};
export default HomeSpotCard;
