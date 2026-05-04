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
        <Image
          source={require("../../assets/logo/logo_app.png")}
          style={{ width: 350, height: 350 }}
        />
      </ImageBackground>
    );

  return <Stack screenOptions={{ headerShown: false }} />;
}
