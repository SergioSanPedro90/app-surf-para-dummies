import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ImageBackground,
  ScrollView,
  Image,
  Modal,
} from "react-native";

const SurfRulesCard = () => {
  const [showRules, setShowRules] = useState(false);

  return (
    <>
      <Pressable onPress={() => setShowRules(true)} className="mx-5">
        <View className="mx-2 mt-2 mb-2 rounded-2xl p-4 flex-row justify-between items-center bg-gray-100 border-l-4 border-blue-400">
          <View className="flex-1 mr-4">
            <Text className="font-bold text-lg text-brand-dark">
              Reglas del surfing
            </Text>
            <Text className="text-sm mt-1 text-gray-500">
              Para que todos disfrutemos de las olas
            </Text>
          </View>
          <LinearGradient
            colors={["#F5C400", "#F59B00"]}
            start={[0, 0]}
            end={[1, 0]}
            style={{
              borderRadius: 50,
              paddingHorizontal: 4,
              paddingVertical: 3,
            }}
          >
            <View className="rounded-full px-3 py-2">
              <Text className="text-sm font-bold text-brand-dark">Ver →</Text>
            </View>
          </LinearGradient>
        </View>
      </Pressable>

      {showRules && (
        <Modal visible={showRules} transparent animationType="fade">
          <View className="flex-1 bg-black/90 justify-center items-center">
            <Pressable
              onPress={() => setShowRules(false)}
              className="absolute top-12 right-5 bg-black rounded-full p-3 z-10"
            >
              <Text className="text-white font-bold px-2">✕</Text>
            </Pressable>
            <ScrollView
              maximumZoomScale={3}
              minimumZoomScale={1}
              className="w-full"
            >
              <Image
                className="my-4 rounded-x"
                source={require("../../../assets/images/rules/surf_rules.png")}
                style={{ width: "100%", height: 800 }}
                resizeMode="contain"
              />
            </ScrollView>
          </View>
        </Modal>
      )}
    </>
  );
};
export default SurfRulesCard;
