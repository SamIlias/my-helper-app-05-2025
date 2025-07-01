import React from 'react';
import { WeatherDataType } from '../api/wheatherApi';
import { useTranslation } from 'react-i18next';
import { textColors } from '../../../shared/myStyles/myStyles';
import { WeatherDescription } from '../api/weatherCodes';

type Props = { weatherData: WeatherDataType; description: WeatherDescription | null };

export const WeatherInfo: React.FC<Props> = ({ weatherData, description }) => {
  const { t } = useTranslation('weatherpage');
  return (
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
          className="h-2/3 md:h-2/5 lg:h-1/2 border rounded-md bg-stone-300 dark:bg-stone-300/20"
        />
      </div>
    </div>
  );
};
