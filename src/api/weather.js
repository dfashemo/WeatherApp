//fetch current & fetch forecast functions
import axios from 'axios';

const WEATHER_KEY = process.env.REACT_APP_GOOGLE_WEATHER_API_KEY;
const GEOCODE_KEY = process.env.REACT_APP_GOOGLE_GEOCODING_API_KEY;
const WEATHER_BASE_URL = "https://weather.googleapis.com/v1";
const GEOCODE_BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json";


//Convert a city name to latitude and longitude coordinates using the Google Geocoding API
//coordinate format is {lat, lon}
export async function geocodeCity(city) {
  const { data } = await axios.get(GEOCODE_BASE_URL, {
    params: { address: city, key: GEOCODE_KEY },
  });

  // 1) API‐level error
  if (data.status !== 'OK') {
    throw new Error(
      data.error_message ||
      `Geocoding failed with status "${data.status}".`
    );
  }

  // 2) No results at all
  if (!data.results || data.results.length === 0) {
    throw new Error(`No location found for “${city}”.`);
  }

  // 3) Safe to pull the first result
  const { lat, lng } = data.results[0].geometry.location;
  return { lat, lon: lng };
}

//Get current conditions for the given coordinates
//We can use metric or imperial system
export function fetchCurrentByCoords(coords, unitsSystem = 'IMPERIAL') {
    return axios.get(`${WEATHER_BASE_URL}/currentConditions:lookup`, {
        params: {
            key: WEATHER_KEY,
            'location.latitude': coords.lat,
            'location.longitude': coords.lon,
            unitsSystem,
        },
    })
    .then(res => res.data);
}

//Get up to 'days' (param) days of faily forecasts
//max 10 days, optional pagination
export function fetchDailyForecastByCoords(coords, days = 5, pageSize = days, unitsSystem = 'IMPERIAL') {
    return axios.get(`${WEATHER_BASE_URL}/forecast/days:lookup`, {
        params: {
            key: WEATHER_KEY,
            'location.latitude': coords.lat,
            'location.longitude': coords.lon,
            days,
            pageSize,
            unitsSystem,
            
        },
    })
    .then(res => res.data);
}

//Get up to 'hours' (param) hours of hourly forecasts
//max 24 hours, optional pagination
export function fetchHourlyForecastByCoords(coords, hours = 24, pageSize = hours, unitsSystem = 'IMPERIAL') {
    return axios.get(`${WEATHER_BASE_URL}/forecast/hours:lookup`, {
        params: {
            key: WEATHER_KEY,
            'location.latitude': coords.lat,
            'location.longitude': coords.lon,
            hours,
            pageSize,
            unitsSystem,
        },
    })
    .then(res => res.data);
}
/*
export function geocodeCity(city) {
    return axios.get(GEOCODE_BASE_URL, {
        params: {
            address: city,
            key: GEOCODE_KEY,
        },
    })
    .then(res => { const {lat, lng} = res.data.results[0].geometry.location;
        return { lat, lon: lng };
});
}*/