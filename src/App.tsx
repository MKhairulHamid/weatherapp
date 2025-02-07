import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LocationSelect } from './components/LocationSelect';
import { WeatherDisplay } from './components/WeatherDisplay';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 300000, // 5 minutes
    },
  },
});

function App() {
  const [selectedCity, setSelectedCity] = useState<string>('');

  return (
    <QueryClientProvider client={queryClient}>
      <div className="weather-app">
        <div className="weather-app-background"></div>
        <div className="weather-app-content">
          <header className="weather-app-header">
            <div className="header-container">
              <h1 className="app-title">Weather Insights</h1>
              <p className="app-tagline">Real-time weather information at your fingertips</p>
            </div>
          </header>

          <main className="weather-app-main">
            <section className="location-selector">
              <LocationSelect
                onCountryChange={() => setSelectedCity('')}
                onCityChange={setSelectedCity}
              />
            </section>

            {selectedCity && (
              <section className="weather-display">
                <WeatherDisplay city={selectedCity} />
              </section>
            )}
          </main>

          <footer className="weather-app-footer">
            <p>© 2025 Weather Insights | Powered by Accurate Weather Data</p>
          </footer>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;