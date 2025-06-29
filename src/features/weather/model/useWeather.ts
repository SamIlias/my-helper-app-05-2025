import React, { useEffect, useState } from 'react';
import { fetchWeather, WeatherDataType } from '../api/wheatherApi';
import { weatherCodes, WeatherCodesType, WeatherDescription } from '../api/weatherCodes';
import { getTranslation } from '@/shared/api';
import { normalizeError } from '@/shared/utils/errorHandler';
import { getCurrentPeriodOfDay } from '@/shared/utils/getCurrentPeriodOfDay';
import { useTranslation } from 'react-i18next';

const INITIAL_CITY: string = import.meta.env.VITE_CURRENT_CITY;

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherDataType | null>(null);
  const [description, setDescription] = useState<WeatherDescription | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { i18n } = useTranslation('weatherpage');

  const hasLoaded = React.useRef(false);

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

  return {
    weatherData,
    onSubmit,
    errorMessage,
    description,
  };
};
