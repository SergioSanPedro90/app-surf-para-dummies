import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { View, TextInput } from "react-native";

interface SearchBarProps {
  onSearch: (text: string) => void;
}

const SearchBarComponent = ({ onSearch }: SearchBarProps) => {
  return (
    <View className="mx-4 mt-8 flex-row items-center bg-gray-100 rounded-full px-5 py-3 gap-3 mb-2">
      <TextInput
        onChangeText={onSearch}
        placeholder="Busca tu playa..."
        placeholderTextColor="rgba(0,0,0,0.6)"
        className="flex-1 text-gray-800 text-base"
      />
      <LinearGradient
        colors={["#F5C400", "#F59B00"]}
        start={[0, 0]}
        end={[1, 0]}
        style={{ borderRadius: 50, padding: 10 }}
      >
        <Ionicons name="search" size={20} color="#2A2D35" />
      </LinearGradient>
    </View>
  );
};
export default SearchBarComponent;
