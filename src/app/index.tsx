import { router } from "expo-router";
import { View, Text, Pressable, ImageBackground, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  return (
    <ImageBackground
      source={require("../../assets/images/index/surf_index_natural.png")}
      className="flex-1"
      resizeMode="cover"
    >
      <View className="flex-1 bg-black/20">
        <SafeAreaView className="flex-1 justify-between p-6">
          {/* LOGO Y TÍTULO */}
          <View className="items-center mt-2">
            <Image
              source={require("../../assets/logo/logo_app.png")}
              style={{ width: 200, height: 200 }}
            />
          </View>

          {/* BOTONES */}
          <View className="gap-4 mb-6">
            <Pressable className="bg-white rounded-full py-4 items-center">
              <Text className="font-bold text-lg">niciar sesión</Text>
            </Pressable>
            <Pressable
              onPress={() => router.push("/home")}
              className="border border-white rounded-full py-4 items-center"
            >
              <Text className="text-white font-bold text-lg">
                Continuar sin registrar
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};
export default index;
