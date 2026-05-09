import { supabase } from "./supabaseClient";

export async function getSpots() {
  const { data, error } = await supabase
    .from("spots")
    .select(
      "*, spot_conditions(wave_height, wave_period, wave_direction, swell_height, swell_period, water_temp, wind_speed, wind_direction, wind_gusts, air_temp, rain_prob, wave_height_max)",
    );

  if (error) {
    console.log(error);
    return [];
  }

  return data;
}

export async function updateSpotConditions() {
  const spots = await getSpots();

  for (const spot of spots) {
    const responseMarine = await fetch(
      `https://marine-api.open-meteo.com/v1/marine?latitude=${spot.lat}&longitude=${spot.lng}&current=wave_height,wave_direction,wave_period,swell_wave_height,swell_wave_period,sea_surface_temperature&daily=wave_height_max&timezone=Europe%2FBerlin`,
    );
    const dataMarine = await responseMarine.json();
    

    const responseWeather = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${spot.lat}&longitude=${spot.lng}&current=wind_speed_10m,wind_direction_10m,wind_gusts_10m,temperature_2m,precipitation_probability&wind_speed_unit=kmh`,
    );
    const dataWeather = await responseWeather.json();

    const marineCurrent = dataMarine.current;
    const marineDaily = dataMarine.daily;
    const windCurrent = dataWeather.current;

    const { error: upsertError } = await supabase
      .from("spot_conditions")
      .upsert(
        {
          spot_id: spot.id,
          wave_height: marineCurrent.wave_height, // ola
          wave_height_max: marineDaily.wave_height_max[0], // primer día = hoy
          wave_period: marineCurrent.wave_period, // período
          wave_direction: marineCurrent.wave_direction, // dirección ola
          swell_height: marineCurrent.swell_wave_height, // fondo
          swell_period: marineCurrent.swell_wave_period, // período fondo
          water_temp: marineCurrent.sea_surface_temperature, // temperatura
          wind_speed: windCurrent.wind_speed_10m, // viento real
          wind_direction: windCurrent.wind_direction_10m, // dirección viento
          wind_gusts: windCurrent.wind_gusts_10m, // racha máxima
          air_temp: windCurrent.temperature_2m,
          rain_prob: windCurrent.precipitation_probability,
        },
        { onConflict: "spot_id" },
      );
  }
}
