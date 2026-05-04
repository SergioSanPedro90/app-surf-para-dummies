import { supabase } from "./supabaseClient";

export async function getSpots() {
  const { data, error } = await supabase
    .from("spots")
    .select("*, spot_conditions(wave_height, wave_period, wind_speed, wind_direction)");


  if (error) {
    console.log(error);
    return [];
  }

  return data;
}

export async function updateSpotConditions() {
  const spots = await getSpots();

  for (const spot of spots) {
    const response = await fetch(
      `https://marine-api.open-meteo.com/v1/marine?latitude=${spot.lat}&longitude=${spot.lng}&current=wave_height,wave_period,wave_direction,wind_wave_height,wind_wave_direction`,
    );

    const data = await response.json();

    const current = data.current;

    const { error: upsertError } = await supabase
      .from("spot_conditions")
      .upsert(
        {
          spot_id: spot.id,
          wave_height: current.wave_height,
          wave_period: current.wave_period,
          wind_speed: current.wind_wave_height,
          wind_direction: current.wave_direction,
          updated_at: new Date(),
        },
        { onConflict: "spot_id" },
      );
  }
}
