import { View, Text, Pressable, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "../store/authStore";
import { useFavsStore } from "../store/favoritesStore";

export default function Settings() {
  const { user, signOut } = useAuthStore();
  const { favs } = useFavsStore();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* HEADER */}
      <View className="p-4 flex-row items-center gap-3">
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text className="text-2xl font-bold">Ajustes</Text>
      </View>

      <ScrollView className="px-4">
        {/* PERFIL */}
        <View
          className="bg-white rounded-2xl p-5 mb-4 flex-row items-center gap-4 mt-12"
          style={{ elevation: 2 }}
        >
          <View
            className="w-14 h-14 rounded-full items-center justify-center"
            style={{ backgroundColor: "#F5C400" }}
          >
            <Text
              className="font-bold text-3xl text-center"
              style={{ color: "#2A2D35" }}
            >
              {user?.user_metadata?.nickName?.charAt(0).toUpperCase() ?? "S"}
            </Text>
          </View>
          <View>
            <Text className="font-bold text-lg text-slate-800">
              {user?.user_metadata?.nickName ?? "Surfer"}
            </Text>
            <Text className="text-gray-400 text-sm">{user?.email}</Text>
          </View>
        </View>

        {/* FAVORITOS */}
        <View
          className="bg-white rounded-2xl mb-4 overflow-hidden"
          style={{ elevation: 2 }}
        >
          <View className="p-4 flex-row justify-between items-center">
            <View className="flex-row items-center gap-3">
              <Ionicons name="heart" size={20} color="#ef4444" />
              <Text className="text-slate-800 font-medium">
                Spots favoritos
              </Text>
            </View>
            <Text className="font-bold text-slate-800">{favs.length}</Text>
          </View>
        </View>

        {/* VERSION */}
        <View
          className="bg-white rounded-2xl mb-4 overflow-hidden"
          style={{ elevation: 2 }}
        >
          <View className="p-4 flex-row justify-between items-center">
            <View className="flex-row items-center gap-3">
              <Ionicons
                name="phone-portrait-outline"
                size={20}
                color="#2A2D35"
              />
              <Text className="text-slate-800 font-medium">Versión</Text>
            </View>
            <Text className="text-gray-400">1.0.0</Text>
          </View>
        </View>

        {/* CERRAR SESION */}
        <Pressable onPress={() => signOut()}>
          <View
            className="bg-white rounded-2xl mb-4 overflow-hidden"
            style={{ elevation: 2 }}
          >
            <View className="p-4 flex-row items-center gap-3">
              <Ionicons name="log-out-outline" size={20} color="#ef4444" />
              <Text className="text-red-500 font-medium">Cerrar sesión</Text>
            </View>
          </View>
        </Pressable>
      </ScrollView>
      <View className="items-center py-6">
          <Image
            source={require("../../assets/logo/logo_app_surf.png")}
            style={{ width: 80, height: 80 }}
            resizeMode="contain"
          />
          <Text className="text-gray-400 text-xs">
            Surf para Dummies v1.0.0
          </Text>
        </View>
    </SafeAreaView>
  );
}
