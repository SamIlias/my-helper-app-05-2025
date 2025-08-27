import { SearchForm } from '@/shared/ui';
import React from 'react';
import { Preloader } from '@/shared/ui/Preloader';
import preloader from '@/shared/assets/preloaderSun.svg';
import { useTranslation } from 'react-i18next';
import { useWeather } from '@/features/weather';
import { WeatherInfo } from '@/features/weather/ui/WeatherInfo';

export const WeatherWidget: React.FC = () => {
  const { t } = useTranslation('weatherpage');
  const { weatherData, onSubmit, errorMessage, description } = useWeather();

  return (
    <div className="grid grid-rows-[1fr_auto] h-full">
      <div className="grid">
        {errorMessage && (
          <strong className="absolute top-0 text-red-700 mt-2">{errorMessage}</strong>
        )}

        {weatherData ? (
          <WeatherInfo weatherData={weatherData} description={description} />
        ) : (
          <div className="flex items-center border justify-center">
            <Preloader preloader={preloader} />
          </div>
        )}
      </div>

      <div className="w-7/8 mx-auto my-2">
        <SearchForm onSubmit={onSubmit} placeholder={t('searchFormPlaceholder')} />
      </div>
    </div>
  );
};
