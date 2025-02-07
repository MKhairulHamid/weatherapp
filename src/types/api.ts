export interface Country {
    id: string;
    name: string;
  }
  
  export interface City {
    id: string;
    name: string;
    countryId: string;
  }
  
  export interface Wind {
    speed: number;
    direction: string;
  }
  
  export interface WeatherData {
    location: string;
    time: string;
    wind: Wind;
    visibility: string;
    skyConditions: string;
    temperatureCelsius: number;
    temperatureFahrenheit: number;
    dewPoint: number;
    relativeHumidity: number;
    pressure: number;
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
  }