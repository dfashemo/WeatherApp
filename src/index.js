import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { WeatherProvider } from './context/WeatherContext';
import './styles/globals.css';

//render App within the WeatherProvider
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <WeatherProvider>
      <App />
    </WeatherProvider>
  </React.StrictMode>
);
