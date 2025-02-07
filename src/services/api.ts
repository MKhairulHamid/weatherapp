// src/services/api.ts
import axios, { AxiosResponse } from 'axios';
import { Country, City, WeatherData, ApiResponse } from '../types/api';

const BASE_URL = 'https://weatherappapi20250207082422.azurewebsites.net';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getCountries = async (): Promise<Country[]> => {
  const response: AxiosResponse<ApiResponse<Country[]>> = await api.get('/api/Location/countries');
  return response.data.data;
};

export const getCities = async (countryId: string): Promise<City[]> => {
  const response: AxiosResponse<ApiResponse<City[]>> = await api.get(`/api/Location/cities/${countryId}`);
  return response.data.data;
};

export const getWeather = async (city: string): Promise<WeatherData> => {
  const response: AxiosResponse<WeatherData> = await api.get(`/WeatherForecast/${city}`);
  return response.data;
};