import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { View, Text } from "react-native";

interface WaveCardProps {
  waveHeight: number;
  waveHeightMax: number;
  wavePeriod: number;
  swellHeight: number;
  swellPeriod: number;
  waveDirection: string;
}

const WaveCard = ({
  waveHeight,
  wavePeriod,
  swellHeight,
  swellPeriod,
  waveDirection,
  waveHeightMax
}: WaveCardProps) => {
  const [powerColor, setPowerColor] =  useState('text-green')

  const wavePower = (swellHeight: number, swellPeriod: number) => {
    const power = 0.5 * swellHeight * swellHeight * swellPeriod;

    if (power < 10) return "Baja";
    if (power < 20) return "Media";
    return "Alta";
  };

  const waveColorPower = (swellHeight: number, swellPeriod: number) => {
    const power = 0.5 * swellHeight * swellHeight * swellPeriod;

    if (power < 10) return "text-green-500";
    if (power < 20) return "text-orange-500";
    return "text-red-500";
  }


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
        <Text style={{ fontSize: 20 }}>🌊</Text>
        <Text className="font-bold text-slate-800 text-lg">Oleaje</Text>
      </View>

      {/* WAVE HEIGHT */}
      <View className="py-4 items-center">
        <Text className="text-5xl font-bold text-slate-800">{waveHeight}</Text>
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
          <Text className={`text-lg font-bold ${waveColorPower(swellHeight, swellPeriod)}`}>
            {wavePower(swellHeight, swellPeriod)}
          </Text>
        </View>
        <View className="flex-1 items-center py-4">
          <Text className="text-xs text-gray-400 mb-1">Dirección Olas</Text>
          <Text className="text-lg font-bold text-slate-800">
            {waveDirection}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default WaveCard;
