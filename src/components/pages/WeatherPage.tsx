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
    <div className="grid grid-rows-[auto_4fr_1fr] grid-cols-14 h-full m-3">
      <h1 className={`${myStyles.pageTitle} col-start-1 col-span-14 place-self-start mb-2`}>
        Weather
      </h1>
      {weatherData ? (
        <div className="col-start-1 col-span-14 grid gap-2 grid-rows-[1fr_1fr] md:grid-cols-[1fr_1fr] content-center">
          <div className="border md:text-md lg:text-lg justify-items-start">
            <h1 className="border content-start justify-self-center m-2 text-amber-400 ">
              The weather for today!
            </h1>
            <p>Country: {weatherData.country}</p>
            <p>Current city: {weatherData.cityName}</p>
            <p>Temperature: {weatherData.current.temperature}</p>
            <p>Wind Speed: {weatherData.current.windSpeed}</p>
          </div>

          <div className="border rounded-lg border-gray-700 justify-items-center">
            <img src={weatherCodes[weatherCode][getCurrentPeriodOfDay()].image} alt={weatherCode} />
            <p>{weatherCodes[weatherCode][getCurrentPeriodOfDay()].description}</p>
          </div>
        </div>
      ) : (
        <div className="justify-items-center">
          <Preloader preloader={preloader} />
        </div>
      )}

      <div className="col-start-1 col-span-14">
        <SearchForm onSubmit={onSubmit} placeholder={'Search city...'} />
      </div>

      {errorMessage && <p className={'text-red-700'}>{errorMessage}</p>}
    </div>
  );
};

export default WeatherPage;
