import { View, Text, Pressable } from "react-native";

interface HomeSpotTabs {
  activeTab: "nearby" | "favs";
  onTabChange: (tab: "nearby" | "favs") => void;
}

const HomeSpotTabs = ({ activeTab, onTabChange }: HomeSpotTabs) => {
  return (
    <View className="flex justify-center items-center mt-6">
      <Text className="text-3xl font-bold">SPOTS</Text>

      <View className="flex-row mt-4 gap-24">
        <Pressable onPress={() => onTabChange("nearby")}>
          <Text
            className={`text-center font-bold text-base ${activeTab === "nearby" ? "text-black text-lg" : "text-gray-500"}`}
          >
            Cercanos
          </Text>
          <View
            className={`h-[3px] mt-1 rounded-full w-32 ${activeTab === "nearby" ? "bg-blue-400" : "bg-transparent"}`}
          />
        </Pressable>

        <Pressable onPress={() => onTabChange("favs")}>
          <Text
            className={`text-center font-bold text-base ${activeTab === "favs" ? "text-black text-lg" : "text-gray-500"}`}
          >
            Favoritos
          </Text>
          <View
            className={`h-[3px] mt-1 rounded-full w-32 ${activeTab === "favs" ? "bg-blue-400" : "bg-transparent"}`}
          />
        </Pressable>
      </View>
    </View>
  );
};
export default HomeSpotTabs;
