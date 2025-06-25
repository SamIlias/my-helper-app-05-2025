import { SearchForm } from '@/shared/ui/SearchForm.tsx';
import React, { useEffect } from 'react';
import { Preloader } from '@/shared/ui/Preloader.tsx';
import preloader from '@/shared/assets/preloaderSun.svg';
import { useTranslation } from 'react-i18next';
import { useWeather } from '@/features/weather/model/useWeather';
import { textColors } from '@/shared/myStyles/myStyles';
import { PageHeader } from '@/shared/ui/PageHeader';

const INITIAL_CITY: string = import.meta.env.VITE_CURRENT_CITY;

const WeatherPage: React.FC = () => {
  const { t } = useTranslation('weatherpage');
  const { weatherData, loadWeatherData, setTranslatedDescription, errorMessage, description } =
    useWeather();

  const hasLoaded = React.useRef(false);
  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;
    loadWeatherData(INITIAL_CITY);
  }, []);

  useEffect(() => {
    if (!weatherData?.current.weatherCode) return;
    setTranslatedDescription();
  }, [weatherData?.current.weatherCode]);

  const onSubmit = (cityName: string) => {
    loadWeatherData(cityName);
  };

  return (
    <div className="flex flex-col min-h-0 h-full p-4 gap-2">
      {/* Header */}
      <PageHeader title={t('title')} />

      {/* Main content */}
      <main className="relative grid h-full">
        {errorMessage && (
          <strong className="absolute top-0 text-red-700 mt-2">{errorMessage}</strong>
        )}
        {weatherData ? (
          <div className="grid grid-rows-[auto_1fr] md:grid-rows-none md:grid-cols-2 ">
            <div
              className={` ${textColors.secondary} w-full h-full md:w-2/3 content-end md:content-center justify-items-center md:justify-items-end md:justify-self-end p-4 text-sm md:text-base lg:text-lg space-y-2`}
            >
              <h2 className={`text-lg font-semibold ${textColors.main}`}>{t('header')}</h2>
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
                className="h-2/3 md:h-2/5 lg:h-1/2 border rounded-md bg-stone-300 dark:bg-stone-500/10"
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
