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
    <div className="flex ml-7 my-3 gap-10 w-full">
      <div className={` gap-1 h-full text-sm flex flex-col`}>
        <div className={`${textColors.main}`}>
          {weatherData.country}, {weatherData.cityName}
        </div>

        <div className="flex justify-end gap-5 items-center">
          <span className={`text-5xl ${textColors.main}`}>
            {weatherData.current.temperature} °C
          </span>
        </div>

        <div className={`flex justify-start gap-5 items-center text-lg ${textColors.secondary}`}>
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

      <div>
        <img
          src={description?.image}
          alt={description?.description}
          className="h-24 w-24 object-contain"
        />
      </div>
    </div>
  );
};
