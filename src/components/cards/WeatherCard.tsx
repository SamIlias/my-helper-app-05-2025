import * as React from 'react';
import { CitySearchForm } from '../CitySearchForm.tsx';
import { useEffect, useState } from 'react';
import { fetchWeather, WeatherDataType } from '../../api/weatherAPI/wheatherApi.ts';
import { weatherCodes, WeatherCodesType } from '../../api/weatherAPI/weatherCodes.ts';

const INITIAL_CITY = import.meta.env.VITE_CURRENT_CITY;

const WeatherCard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherDataType>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const weatherCode = String(weatherData?.current.weatherCode) as WeatherCodesType;

  const loadWeatherData: (cityName: string) => Promise<void> = async (cityName) => {
    try {
      const data: WeatherDataType = await fetchWeather(cityName);
      setWeatherData(data);
      setErrorMessage(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      }
    }
  };

  useEffect(() => {
    loadWeatherData(INITIAL_CITY);
  }, []);

  const onSubmit = async (cityName: string) => {
    loadWeatherData(cityName);
  };

  return (
    <>
      {weatherData && (
        <div>
          <p>Country: {weatherData.country}</p>
          <p>Current city: {weatherData.cityName}</p>
          <p>Temperature: {weatherData.current.temperature}</p>
          <p>Wind Speed: {weatherData.current.windSpeed}</p>
          <img src={weatherCodes[weatherCode].day.image} alt={weatherCode} />
        </div>
      )}

      <CitySearchForm onSubmit={onSubmit} />

      {errorMessage && <p className={'text-red-700'}>{errorMessage}</p>}
    </>
  );
};

export default WeatherCard;
