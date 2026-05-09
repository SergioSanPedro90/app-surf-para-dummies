import { Stack } from "expo-router";
import "../../global.css";
import { useEffect, useState } from "react";
import { View, Image, ImageBackground } from "react-native";
import { supabase } from "../services/supabaseClient";
import { useAuthStore } from "../store/authStore";

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) useAuthStore.setState({ user: session.user });
      setTimeout(() => {
        setIsReady(true);
      }, 1000);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      useAuthStore.setState({ user: session?.user ?? null });
    });
  }, []);

  if (!isReady)
    return (
      <ImageBackground
        source={require("../../assets/images/index/surf_index_natural.png")}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        resizeMode="cover"
      >
        <View className="absolute inset-0 bg-black/40" />
        <Image
          source={require("../../assets/logo/logo_app_surf.png")}
          style={{ width: 370, height: 370 }}
          resizeMode="contain"
        />
      </ImageBackground>
    );

  return <Stack screenOptions={{ headerShown: false }} />;
}
