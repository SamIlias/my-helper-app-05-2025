import * as React from 'react';
import { SearchForm } from '../common/SearchForm.tsx';
import { useEffect, useState } from 'react';
import { fetchWeather, WeatherDataType } from '../../api/weatherAPI/wheatherApi.ts';
import { weatherCodes, WeatherCodesType } from '../../api/weatherAPI/weatherCodes.ts';
import { Preloader } from '../common/Preloader.tsx';
import preloader from '../../assets/preloaderSun.svg';

const INITIAL_CITY = import.meta.env.VITE_CURRENT_CITY;

const WeatherPage: React.FC = () => {
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

  const onSubmit = (cityName: string) => {
    loadWeatherData(cityName);
  };

  return (
    <div className="grid col-14 text-center h-full">
      {weatherData ? (
        <>
          <h1 className="row-start-2 col-span-7 col-start-1 content-start text-amber-400 sm:text-[4vw] lg:text-[2vw]">
            The weather for today!
          </h1>
          <div className="border col-span-7 col-start-1 md:text-[2vw] lg:text-[1vw] row-start-3 justify-self-end ">
            <p>Country: {weatherData.country}</p>
            <p>Current city: {weatherData.cityName}</p>
            <p>Temperature: {weatherData.current.temperature}</p>
            <p>Wind Speed: {weatherData.current.windSpeed}</p>
          </div>
          <div className="border col-span-7 row-start-3">
            <img src={weatherCodes[weatherCode].day.image} alt={weatherCode} />
          </div>
        </>
      ) : (
        <div className="row-start-2 justify-items-center">
          <Preloader preloader={preloader} />
        </div>
      )}

      <div className="row-start-6">
        <SearchForm onSubmit={onSubmit} placeholder={'Search city...'} />
      </div>

      {errorMessage && <p className={'text-red-700'}>{errorMessage}</p>}
    </div>
  );
};

export default WeatherPage;
