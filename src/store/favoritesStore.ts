import { create } from "zustand";
import { useAuthStore } from "./authStore";
import { supabase } from "../services/supabaseClient";

interface Favorites {
  favs: number[];
  addFav: (spotId: number) => Promise<void>;
  removeFav: (spotId: number) => Promise<void>;
  getFavs: () => Promise<void>;
  clearFavs: () => void;
}

export const useFavsStore = create<Favorites>((set) => ({
  favs: [],
  addFav: async (spotId) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    const { error } = await supabase
      .from("favorites")
      .insert({ user_id: user.id, spot_id: spotId });

    if (error) {
      console.log(error);
      return;
    }
    set((state) => ({ favs: [...state.favs, spotId] }));
  },
  removeFav: async (spotId) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", user.id)
      .eq("spot_id", spotId);

    if (error) {
      console.log(error);
      return;
    }

    set((state) => ({ favs: state.favs.filter((id) => id !== spotId) }));
  },

  getFavs: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    const { data, error } = await supabase
      .from("favorites")
      .select("spot_id")
      .eq("user_id", user.id);

    if (error) {
      console.log(error);
      return;
    }

    set({ favs: data.map((f) => f.spot_id) });
  },

  clearFavs: () => set({ favs: [] })
}));
