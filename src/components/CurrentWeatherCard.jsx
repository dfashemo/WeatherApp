import React from 'react';

export default function CurrentWeatherCard({ data, units }) {
  const cond = data;  
  if (!cond) return null;

  const iconUrl     = `${cond.weatherCondition.iconBaseUri}.png`;
  const description = cond.weatherCondition.description.text;
  const temp        = cond.temperature.degrees;
  const feelsLike   = cond.feelsLikeTemperature.degrees;
  const humidity    = cond.relativeHumidity;

  // Wind speed is an object so we have to unwrap it
  const windObj   = cond.wind.speed;           
  const windValue = windObj.value;
  const windLabel = units === 'IMPERIAL' ? 'mph' : 'm/s';

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-md w-full mb-4">
      <div className="text-2xl font-semibold mb-4">Today's Weather:</div>
      <div className="flex items-center justify-between">
        <img src={iconUrl} alt={description} className="h-20 w-20" />
        <div className="text-5xl font-bold">
          {Math.round(temp)}°{units === 'IMPERIAL' ? 'F' : 'C'}
        </div>
      </div>
      <div className="capitalize text-lg mt-2">{description}</div>
      <div className="mt-4 text-sm text-gray-600">
        Feels like {Math.round(feelsLike)}°{units === 'IMPERIAL' ? 'F' : 'C'} •{' '}
        Humidity {humidity}% •{' '}
        Wind {Math.round(windValue)} {windLabel}
      </div>
    </div>
  );
}
