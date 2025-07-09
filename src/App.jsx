import React, { useContext, useEffect, useState, useRef } from 'react';
import WeatherContext from './context/WeatherContext';
import useGeolocation from './hooks/useGeolocation';
import { useWeather }      from './hooks/useWeather';
import SearchBar          from './components/SearchBar';
import CurrentWeatherCard from './components/CurrentWeatherCard';
import ForecastList       from './components/ForecastList';
import Loader             from './components/Loader';
import Error              from './components/Error';

export default function App() {
  const { city, setCity, addToHistory, history } = useContext(WeatherContext);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [units, setUnits] = useState('IMPERIAL');
  const { lat, lon, loading: geoLoading, error: geoError } = useGeolocation();

  const { current, daily, loading, error } = useWeather({
    city: city.trim() || null,
    geo:  lat != null && lon != null ? { lat, lon } : null,
    units,
  });

  //On the very first render only, clear out the last session's results!
  useEffect(() => {
    if(!hasInitialized) {
      setCity('');
      setHasInitialized(true);
    }
  }, [hasInitialized, setCity]);


  // Track which city we've already saved
  const prevCityRef = useRef(null);
  useEffect(() => {
    if (current && city && prevCityRef.current !== city) {
      addToHistory(city);
      prevCityRef.current = city;
    }
  }, [current, city, addToHistory]);

  const handleUseGeo = () => setCity('');

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Weather App!</h1>
      <p className="text-white">To see the forecast, enter a city name or click “📍” to use your current location</p>
      <div className="w-full max-w-md flex space-x-2 mb-4">
        <SearchBar onSearch={setCity} onUseGeo={handleUseGeo} />
        <select
          value={units}
          onChange={(e) => setUnits(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="METRIC">°C</option>
          <option value="IMPERIAL">°F</option>
        </select>
      </div>

      {loading || geoLoading ? (
        <Loader />
      ) : error || geoError ? (
        <Error message={error || geoError} />
      ) : current ? (
        <>
          <CurrentWeatherCard data={current} units={units} />
          <ForecastList daily={daily} units={units} />
        </>
      ) : (
        <div className="text-gray-600">
          Enter a city or click “📍” to use your location.
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-4">
          <h2 className="font-semibold">Recent Searches:</h2>
          <ul className="flex space-x-2">
            {history.map(item => (
              <li
                key={item}
                className="cursor-pointer underline text-white"
                onClick={() => setCity(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}
