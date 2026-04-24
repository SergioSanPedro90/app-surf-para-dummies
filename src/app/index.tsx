import { Text, View, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { getSurfData } from "../services/stormgalss";

export default function Index() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getSurfData().then((result) => setData(result.hours[0]));
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-white">
      {data ? (
        <View className="gap-2 items-center">
          <Text className="text-2xl font-bold">La Arena 🏄‍♂️</Text>
          <Text>Altura ola: {data.waveHeight.sg}m</Text>
          <Text>Período: {data.wavePeriod.sg}s</Text>
          <Text>Viento: {data.windSpeed.sg} m/s</Text>
        </View>
      ) : (
        <Text>Cargando...</Text>
      )}
    </View>
  );
}