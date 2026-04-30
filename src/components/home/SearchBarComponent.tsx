import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { View, TextInput } from "react-native";

interface SearchBarProps {
  onSearch: (text: string) => void;
}

const SearchBarComponent = ({ onSearch }: SearchBarProps) => {
  return (
    <View className="mx-4 mt-12 flex-row items-center bg-gray-800 rounded-full px-5 py-3 gap-3">
      <TextInput
        onChangeText={onSearch}
        placeholder="Busca tu playa..."
        placeholderTextColor="rgba(255,255,255,0.5)"
        className="flex-1 text-white text-base"
      />
      <LinearGradient
        colors={["#2AF598", "#009EFD"]}
        start={[0, 0]}
        end={[1, 0]}
        style={{ borderRadius: 50, padding: 10 }}
      >
        <Ionicons name="search" size={20} color="white" />
      </LinearGradient>
    </View>
  );
};
export default SearchBarComponent;
