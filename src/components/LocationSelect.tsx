import React, { FC, useState, ChangeEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCountries, getCities } from '../services/api';
import './LocationSelect.css';

interface LocationSelectProps {
  onCountryChange: (countryId: string) => void;
  onCityChange: (city: string) => void;
}

export const LocationSelect: FC<LocationSelectProps> = ({ onCountryChange, onCityChange }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  const { data: countries, isLoading: isLoadingCountries } = useQuery({
    queryKey: ['countries'],
    queryFn: getCountries,
  });

  const { data: cities, isLoading: isLoadingCities } = useQuery({
    queryKey: ['cities', selectedCountry],
    queryFn: () => getCities(selectedCountry),
    enabled: !!selectedCountry,
  });

  const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCountry(value);
    onCountryChange(value);
  };

  const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onCityChange(e.target.value);
  };

  return (
    <div className="location-select-container">
      <div className="location-select-wrapper">
        <div className="location-select-group">
          <label className="location-select-label">
            Select Country
          </label>
          <div className="location-select-input-wrapper">
            <select
              className="location-select-input"
              onChange={handleCountryChange}
              disabled={isLoadingCountries}
            >
              <option value="">Select a country</option>
              {countries?.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
            <div className="location-select-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="location-select-group">
          <label className="location-select-label">
            Select City
          </label>
          <div className="location-select-input-wrapper">
            <select
              className="location-select-input"
              onChange={handleCityChange}
              disabled={!selectedCountry || isLoadingCities}
            >
              <option value="">
                {isLoadingCities ? "Loading cities..." : "Select a city"}
              </option>
              {cities?.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
            <div className="location-select-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};