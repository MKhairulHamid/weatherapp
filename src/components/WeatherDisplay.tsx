import React, { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getWeather } from '../services/api';
import './WeatherDisplay.css';

interface WeatherDisplayProps {
  city: string;
}

interface WeatherCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subValue?: string;
}

const WeatherCard: FC<WeatherCardProps> = ({ 
  title, 
  value, 
  unit, 
  subValue 
}) => (
  <div className="weather-card">
    <h3 className="weather-card-title">{title}</h3>
    <p className="weather-card-value">
      {value}{unit}
    </p>
    {subValue && (
      <p className="weather-card-subvalue">{subValue}</p>
    )}
  </div>
);

export const WeatherDisplay: FC<WeatherDisplayProps> = ({ city }) => {
  const { data: weather, isLoading, error } = useQuery({
    queryKey: ['weather', city],
    queryFn: () => getWeather(city),
    enabled: !!city,
  });

  if (!city) return null;
  
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner-wrapper">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <svg className="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="error-message">
            Error loading weather data. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  const getBackgroundClass = () => {
    const conditions = weather.skyConditions.toLowerCase();
    if (conditions.includes('clear')) return 'weather-clear';
    if (conditions.includes('cloud')) return 'weather-cloudy';
    if (conditions.includes('rain')) return 'weather-rainy';
    if (conditions.includes('snow')) return 'weather-snow';
    return 'weather-default';
  };

  return (
    <div className={`weather-container ${getBackgroundClass()}`}>
      <div className="weather-header">
        <h2 className="weather-location">{weather.location}</h2>
        <span className="weather-time">
          {new Date(weather.time).toLocaleString()}
        </span>
      </div>

      <div className="weather-grid">
        <WeatherCard
          title="Temperature"
          value={weather.temperatureCelsius}
          unit="°C"
          subValue={`${weather.temperatureFahrenheit}°F`}
        />

        <WeatherCard
          title="Wind"
          value={weather.wind.speed}
          unit=" m/s"
          subValue={`Direction: ${weather.wind.direction}`}
        />

        <WeatherCard
          title="Sky Conditions"
          value={weather.skyConditions}
          subValue={`Visibility: ${weather.visibility}`}
        />

        <WeatherCard
          title="Humidity"
          value={weather.relativeHumidity}
          unit="%"
          subValue={`Pressure: ${weather.pressure} hPa`}
        />

        <WeatherCard
          title="Dew Point"
          value={weather.dewPoint}
          unit="°"
        />

        <div className="weather-icon-container">
          <span className="weather-icon">
            {weather.skyConditions.includes('clear') ? '☀️' : 
             weather.skyConditions.includes('cloud') ? '☁️' :
             weather.skyConditions.includes('rain') ? '🌧️' :
             weather.skyConditions.includes('snow') ? '❄️' : '🌤️'}
          </span>
        </div>
      </div>
    </div>
  );
};