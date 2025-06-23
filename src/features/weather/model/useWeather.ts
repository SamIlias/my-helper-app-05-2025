import { useState } from 'react';
import { fetchWeather, WeatherDataType } from '../api/wheatherApi';
import { weatherCodes, WeatherCodesType, WeatherDescription } from '../api/weatherCodes';
import { getTranslation } from '../../../shared/api/translator/translatorAPI';
import { normalizeError } from '../../../shared/lib/utils/errorHandler';
import { getCurrentPeriodOfDay } from '../../../shared/lib/utils/getCurrentPeriodOfDay';
import { useTranslation } from 'react-i18next';

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherDataType | null>(null);
  const [description, setDescription] = useState<WeatherDescription | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { i18n } = useTranslation('weatherpage');

  const loadWeatherData: (cityName: string) => Promise<void> = async (cityName) => {
    try {
      setErrorMessage(null);
      const data: WeatherDataType = await fetchWeather(cityName);
      const translatedData = await getTranslation(data, i18n.language);
      setWeatherData(translatedData);
    } catch (err: unknown) {
      setErrorMessage(normalizeError(err));
    }
  };

  const setTranslatedDescription = async () => {
    const weatherCode = String(weatherData?.current.weatherCode) as WeatherCodesType;
    if (weatherCode) {
      const descriptionObj = weatherCodes[weatherCode][getCurrentPeriodOfDay()];
      const translatedDescription = {
        description: await getTranslation(descriptionObj.description, i18n.language),
        image: descriptionObj.image,
      };
      setDescription(translatedDescription);
    }
  };

  return {
    weatherData,
    loadWeatherData,
    setTranslatedDescription,
    errorMessage,
    description,
  };
};
