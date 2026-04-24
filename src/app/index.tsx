import { Text, View, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { getSurfData } from "../services/stormgalss";
import SpotCard from "../components/SpotCard";

export default function Index() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getSurfData().then((result) => setData(result.hours[0]));
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-white">
      {data ? (
        <SpotCard
          waveHeight={data.waveHeight.sg}
          wavePeriod={data.wavePeriod.sg}
          windSpeed={data.windSpeed.sg}
        />
      ) : (
        <Text>Cargando...</Text>
      )}
    </View>
  );
}
