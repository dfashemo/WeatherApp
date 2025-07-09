import { useState, useEffect } from 'react';
import {
  geocodeCity,
  fetchCurrentByCoords,
  fetchDailyForecastByCoords,
  fetchHourlyForecastByCoords,
} from '../api/weather';

export function useWeather({ city = null, geo = null, units = 'METRIC' } = {}) {
  const [current, setCurrent] = useState(null);
  const [daily,   setDaily]   = useState(null);
  const [hourly,  setHourly]  = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  // extract primitives so they don't change every render
  const lat = geo?.lat ?? null;
  const lon = geo?.lon ?? null;

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const coords = city
          ? await geocodeCity(city)
          : { lat, lon };

        const [c, d, h] = await Promise.all([
          fetchCurrentByCoords(      coords, units),
          fetchDailyForecastByCoords(coords, 5, 5, units),
          fetchHourlyForecastByCoords(coords, 24, 24, units),
        ]);

        if (!cancelled) {
          setCurrent(c);
          setDaily(d.forecastDays   || d);
          setHourly(h.forecastHours || h);
        }
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if ((city && city.trim()) || (lat != null && lon != null)) {
      load();
    }

    return () => {
      cancelled = true;
    };
  // ← only re-run when these primitives actually change
  }, [city, lat, lon, units]);

  return { current, daily, hourly, loading, error };
}
