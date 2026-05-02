import { Stack } from "expo-router";
import "../../global.css";
import { useEffect } from "react";
import { supabase } from "../services/supabaseClient";
import { useAuthStore } from "../store/authStore";

export default function RootLayout() {
  const {} = useAuthStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) useAuthStore.setState({ user: session.user });
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      useAuthStore.setState({ user: session?.user ?? null });
    });
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}
