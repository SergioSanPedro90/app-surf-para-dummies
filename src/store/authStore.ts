import { create } from "zustand";
import { supabase } from "../services/supabaseClient";
import { router } from "expo-router";
import { useFavsStore } from "./favoritesStore";
import { AuthError } from "@supabase/supabase-js";

interface AuthState {
  user: any | null;
  isLoading: boolean;
  signIn: (email: string, password: string) =>  Promise<AuthError | null>;
  signUp: (email: string, nickName: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  signIn: async (email: string, password: string) => {
    set({ isLoading: true });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log(error);
      set({ isLoading: false });
      return error;
    }
    set({ user: data.user, isLoading: false });
    router.push("/home");
    return null
  },

  signUp: async (email: string, nickName: string, password: string) => {
    set({ isLoading: true });

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickName,
          display_name: nickName,
        },
      },
    });

    if (error) {
      console.log(error);
      set({ isLoading: false });
      return;
    }

    set({ user: data.user, isLoading: false });
    router.push("/home");
  },

  signOut: async () => {
    set({ isLoading: true });

    await supabase.auth.signOut();

    useFavsStore.getState().clearFavs();
    set({ user: null, isLoading: false });
    router.push("/");
  },
}));
