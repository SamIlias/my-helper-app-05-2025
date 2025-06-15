import * as React from 'react';
import { SearchForm } from '../common/SearchForm.tsx';
import { useEffect, useState } from 'react';
import { fetchWeather, WeatherDataType } from '../../api/weatherAPI/wheatherApi.ts';
import {
  weatherCodes,
  WeatherCodesType,
  WeatherDescription,
} from '../../api/weatherAPI/weatherCodes.ts';
import { Preloader } from '../common/Preloader.tsx';
import preloader from '../../assets/preloaderSun.svg';
import { getCurrentPeriodOfDay } from '../../lib/utils/getCurrentPeriodOfDay.ts';
import { myStyles } from '../../myStyles/myStyles.ts';
import { normalizeError } from '../../lib/utils/errorHandler.ts';
import { useTranslation } from 'react-i18next';
import { translate, translateObjectValues } from '../../api/aiTranslatorAPI';

const INITIAL_CITY: string = import.meta.env.VITE_CURRENT_CITY;

const WeatherPage: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherDataType | null>(null);
  const [description, setDescription] = useState<WeatherDescription | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { t, i18n } = useTranslation('weatherpage');

  function getTranslation(source: string): Promise<string>;
  function getTranslation<T>(source: T): Promise<T>;

  async function getTranslation<T>(source: string | T): Promise<string | T | null> {
    const currentLanguage = i18n.language;
    if (currentLanguage === 'en') {
      return source;
    }

    if (typeof source === 'string') {
      return await translate(source, currentLanguage);
    }

    if (typeof source === 'object') {
      return await translateObjectValues<T>(source, currentLanguage);
    }

    return null;
  }

  const loadWeatherData: (cityName: string) => Promise<void> = async (cityName) => {
    try {
      setErrorMessage(null);
      const data: WeatherDataType = await fetchWeather(cityName);
      const translatedData = await getTranslation(data);
      setWeatherData(translatedData);
    } catch (err: unknown) {
      setErrorMessage(normalizeError(err));
    }
  };

  useEffect(() => {
    loadWeatherData(INITIAL_CITY);
  }, []);

  useEffect(() => {
    if (!weatherData?.current.weatherCode) return;

    const weatherCode = String(weatherData.current.weatherCode) as WeatherCodesType;
    if (weatherCode) {
      const description = weatherCodes[weatherCode][getCurrentPeriodOfDay()];
      setDescription(description);
    }
  }, [weatherData?.current.weatherCode]);

  const onSubmit = (cityName: string) => {
    loadWeatherData(cityName);
  };

  return (
    <div className="flex flex-col min-h-0 h-full p-4 gap-2">
      {/* Header */}
      <header className="w-full border-b pb-2">
        <h1 className={`${myStyles.pageTitle} text-2xl md:text-3xl`}>{t('title')}</h1>
      </header>

      {/* Main content */}
      <main className="relative grid h-full">
        {errorMessage && (
          <strong className="absolute top-0 text-red-700 mt-2">{errorMessage}</strong>
        )}
        {weatherData ? (
          <div className="grid grid-rows-[auto_1fr] md:grid-rows-none md:grid-cols-2 ">
            {/* Weather details */}
            <div className="w-full h-full md:w-2/3 content-end md:content-center justify-items-center md:justify-items-end md:justify-self-end p-4 text-sm md:text-base lg:text-lg space-y-2">
              <h2 className="text-lg font-semibold text-amber-500">{t('header')}</h2>
              <p>
                <strong>{t('country')}</strong> {weatherData.country}
              </p>
              <p>
                <strong>{t('currentCity')}</strong> {weatherData.cityName}
              </p>
              <p>
                <strong>{t('temperature')}</strong> {weatherData.current.temperature}
              </p>
              <p>
                <strong>{t('windSpeed')}</strong> {weatherData.current.windSpeed}
              </p>

              <p>
                <strong>{t('description')}</strong> {description?.description}
              </p>
            </div>

            {/* Weather icon and description */}
            <div className="md:w-2/3 content-start md:content-center justify-items-center md:justify-items-start">
              <img
                src={description?.image}
                alt={description?.description}
                className="h-2/3 md:h-2/5 lg:h-1/2 border rounded-md"
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full pb-15">
            <Preloader preloader={preloader} />
          </div>
        )}
      </main>

      {/* Search form */}
      <footer className="w-full border-t pt-4">
        <SearchForm onSubmit={onSubmit} placeholder={t('searchFormPlaceholder')} />
      </footer>
    </div>
  );
};

export default WeatherPage;
