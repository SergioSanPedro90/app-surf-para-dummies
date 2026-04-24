import { mockData } from "../constants/mockData";

const API_KEY = "84794878-3fc8-11f1-af8e-0242ac120004-847948f0-3fc8-11f1-af8e-0242ac120004"

const LAT = 43.3983;
const LNG = -3.2875;
const now = new Date();
const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

export async function getSurfData() {
    // const response = await fetch(`https://api.stormglass.io/v2/weather/point?lat=${LAT}&lng=${LNG}&params=waveHeight,wavePeriod,windSpeed&end=${tomorrow.toISOString()}`,
    //     {
    //         headers: {
    //              Authorization: API_KEY,
    //         }
    //     }
    // )

    // const data = await response.json();
    // console.log(JSON.stringify(data, null, 2));
    // return data;
    return mockData
}