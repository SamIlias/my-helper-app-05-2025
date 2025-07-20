import React from 'react';
import { WeatherDataType } from '../api/wheatherApi';
import { useTranslation } from 'react-i18next';
import { textColors } from '../../../shared/myStyles/myStyles';
import { WeatherDescription } from '../api/weatherCodes';
import { getWindDirectionLabel } from '@/features/weather/api/getWindDirectionLabel';
import i18n from '@/shared/i18n/i18n';

type Props = { weatherData: WeatherDataType; description: WeatherDescription | null };

export const WeatherInfo: React.FC<Props> = ({ weatherData, description }) => {
  const { t } = useTranslation('weatherpage');
  const currentLaguage = i18n.language;

  return (
    <div className={`${textColors.secondary} h-full text-sm flex flex-col`}>
      <p>
        {weatherData.country}, {weatherData.cityName}
      </p>

      <div className="flex h-1/2 justify-center gap-10 items-center ">
        <span className={`text-5xl`}>{weatherData.current.temperature} °C</span>
        <img src={description?.image} alt={description?.description} className="" />
      </div>

      <div className="flex justify-start gap-5 items-center ">
        <span>
          {
            getWindDirectionLabel(Number(weatherData.current.windDirection))[
              currentLaguage === 'ru' || currentLaguage === 'en' ? currentLaguage : 'en'
            ]
          }
        </span>
        <span>{weatherData.current.windSpeed} m/s</span>
      </div>
    </div>
  );
};
