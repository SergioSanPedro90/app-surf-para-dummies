import { create } from "zustand";
import { supabase } from "../services/supabaseClient";
import { router } from "expo-router";

interface AuthState {
  user: any | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
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
      return;
    }
    set({ user: data.user, isLoading: false });
    router.push('/home')
  },

  signUp: async (email: string, nickName: string, password: string) => {
    set({ isLoading: true });

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nickName },
      },
    });

    if (error) {
      console.log(error);
      set({ isLoading: false });
      return;
    }

    set({ user: data.user, isLoading: false });
    router.push('/home')
  },

  signOut: async () => {
    set({ isLoading: true });

    await supabase.auth.signOut();

    set({ user: null, isLoading: false });
    router.push('/')
  },
}));
