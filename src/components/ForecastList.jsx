import React from 'react';

export default function ForecastList({ daily }) {
  if (!Array.isArray(daily)) return null;

  return (
    <div className="flex overflow-x-auto space-x-4 py-4">
      { daily.map 
      ( 
        day => 
      {
        const { displayDate, daytimeForecast, maxTemperature, minTemperature } = day;
        if (!displayDate || !daytimeForecast?.weatherCondition) return null;

        //Getting today's day of the week
        const dateObj = new Date(
          displayDate.year,
          displayDate.month - 1,
          displayDate.day
        );
        const dayName    = dateObj.toLocaleDateString(undefined, { weekday: 'short' });
        const iconUrl    = `${daytimeForecast.weatherCondition.iconBaseUri}.png`;
        const description= daytimeForecast.weatherCondition.description.text;
        const maxDeg     = maxTemperature.degrees;
        const minDeg     = minTemperature.degrees;

        return (
          <div
            key={`${displayDate.year}-${displayDate.month}-${displayDate.day}`}
            className="bg-white p-4 rounded-lg shadow flex-shrink-0 text-center"
          > 
            <div className="font-semibold mb-2">{dayName}</div>
            <img src={iconUrl} alt={description} className="mx-auto mb-2 h-12 w-12" />
            <div className="capitalize mb-2">{description}</div>
            <div className="font-medium">
              {Math.round(maxDeg)}° / {Math.round(minDeg)}°
            </div>
          </div>
        );
      })}
    </div>
  );
}
