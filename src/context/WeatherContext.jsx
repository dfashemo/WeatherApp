//context & provider (city, setcity, history)
import React, { createContext, useState } from 'react';

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [city, setCity] = useState('');
  const [history, setHistory] = useState([]);

  const addToHistory = (newCity) => {
    setHistory(prev => [newCity, ...prev.filter(c => c !== newCity)].slice(0, 5));
  };

  return (
    <WeatherContext.Provider value={{ city, setCity, history, addToHistory }}>
      {children}
    </WeatherContext.Provider>
  );
}

export default WeatherContext;