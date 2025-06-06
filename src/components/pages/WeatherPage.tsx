import * as React from 'react';
import { SearchForm } from '../common/SearchForm.tsx';
import { useEffect, useState } from 'react';
import { fetchWeather, WeatherDataType } from '../../api/weatherAPI/wheatherApi.ts';
import { weatherCodes, WeatherCodesType } from '../../api/weatherAPI/weatherCodes.ts';
import { Preloader } from '../common/Preloader.tsx';
import preloader from '../../assets/preloaderSun.svg';
import { getCurrentPeriodOfDay } from '../../lib/utils/getCurrentPeriodOfDay.ts';
import { myStyles } from '../../myStyles/myStyles.ts';

const INITIAL_CITY: string = import.meta.env.VITE_CURRENT_CITY;

const WeatherPage: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherDataType>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const weatherCode = String(weatherData?.current.weatherCode) as WeatherCodesType;

  const loadWeatherData: (cityName: string) => Promise<void> = async (cityName) => {
    try {
      setErrorMessage(null);

      const data: WeatherDataType = await fetchWeather(cityName);
      setWeatherData(data);
    } catch (err: unknown) {
      // todo: use handleError from AuthPage
      if (err instanceof Error) {
        setErrorMessage(err.message);
      }
    }
  };

  useEffect(() => {
    loadWeatherData(INITIAL_CITY);
  }, []);

  const onSubmit = (cityName: string) => {
    loadWeatherData(cityName);
  };

  return (
    <div className="flex flex-col min-h-0 h-full p-4 gap-2">
      {/* Header */}
      <header className="w-full border-b pb-2">
        <h1 className={`${myStyles.pageTitle} text-2xl md:text-3xl`}>Weather</h1>
      </header>

      {/* Main content */}
      <main className="grid h-full">
        {weatherData ? (
          <div className="grid grid-rows-[auto_1fr] md:grid-rows-none md:grid-cols-2 ">
            {/* Weather details */}
            <div className="w-full h-full md:w-2/3 content-end md:content-center justify-items-center md:justify-items-end md:justify-self-end p-4 text-sm md:text-base lg:text-lg space-y-2">
              <h2 className="text-lg font-semibold text-amber-500">The weather for now!</h2>
              <p>
                <strong>Country:</strong> {weatherData.country}
              </p>
              <p>
                <strong>Current city:</strong> {weatherData.cityName}
              </p>
              <p>
                <strong>Temperature:</strong> {weatherData.current.temperature}
              </p>
              <p>
                <strong>Wind Speed:</strong> {weatherData.current.windSpeed}
              </p>

              <p>
                <strong>Description:</strong>{' '}
                {weatherCodes[weatherCode][getCurrentPeriodOfDay()].description}
              </p>
            </div>

            {/* Weather icon and description */}
            <div className="md:w-2/3 content-start md:content-center justify-items-center md:justify-items-start">
              <img
                src={weatherCodes[weatherCode][getCurrentPeriodOfDay()].image}
                alt={weatherCode}
                className="h-2/3 md:h-2/5 lg:h-1/2 border rounded-md"
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64">
            <Preloader preloader={preloader} />
          </div>
        )}
      </main>

      {/* Search form */}
      <footer className="w-full border-t pt-4">
        <SearchForm onSubmit={onSubmit} placeholder="Search city..." />
        {errorMessage && <p className="text-red-700 mt-2">{errorMessage}</p>}
      </footer>
    </div>
  );
};

export default WeatherPage;
