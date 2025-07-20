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
    <div className="flex flex-col min-h-0 h-full m-2 gap-2">
      <div className="relative grid h-full">
        {errorMessage && (
          <strong className="absolute top-0 text-red-700 mt-2">{errorMessage}</strong>
        )}

        {weatherData ? (
          <WeatherInfo weatherData={weatherData} description={description} />
        ) : (
          <div className="flex items-center justify-center h-full pb-15">
            <Preloader preloader={preloader} />
          </div>
        )}
      </div>

      <div className="w-full border-t py-2">
        <SearchForm onSubmit={onSubmit} placeholder={t('searchFormPlaceholder')} />
      </div>
    </div>
  );
};
