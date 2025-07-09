//returns {lat, lon, error, loading}
import { useState, useEffect } from 'react';
import { getCurrentPosition } from '../utils/geolocation';

//hook to get user's current latitude and longitude
export default function useGeolocation() {
  const [coords, setCoords] = useState({ lat: null, lon: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    getCurrentPosition()
      .then(position => {
        if (cancelled) return;
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      })
      .catch(err => {
        if (cancelled) return;
        setError(err.message);
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    lat: coords.lat,
    lon: coords.lon,
    loading,
    error,
  };
}