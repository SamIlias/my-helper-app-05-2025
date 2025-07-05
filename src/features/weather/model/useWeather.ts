import React, { useEffect, useState } from 'react';
import { fetchWeather, WeatherDataType } from '../api/wheatherApi';
import { weatherCodes, WeatherCodesType, WeatherDescription } from '../api/weatherCodes';
import { getTranslation } from '@/shared/api';
import { normalizeError } from '@/shared/utils/errorHandler';
import { getCurrentPeriodOfDay } from '@/shared/utils/getCurrentPeriodOfDay';
import { useTranslation } from 'react-i18next';
import { useGeolocation } from '@/shared/hooks';
import { getCityFromCoords } from '../../../shared/api/coordinates/getCityFromCoordinates';

const INITIAL_CITY: string = import.meta.env.VITE_CURRENT_CITY;

export const useWeather = () => {
  const { i18n } = useTranslation('weatherpage');
  const [weatherData, setWeatherData] = useState<WeatherDataType | null>(null);
  const [description, setDescription] = useState<WeatherDescription | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentCity, setCurrentCity] = useState<string | null>(null);

  const { coords, error } = useGeolocation();
  useEffect(() => {
    if (!coords || error) return;

    const fetchCityName = async () => {
      try {
        const cityName = await getCityFromCoords(coords.latitude, coords.longitude);
        setCurrentCity(cityName);
      } catch (err) {
        console.log(err);
        setCurrentCity(INITIAL_CITY);
      }
    };

    fetchCityName();
  }, [coords, error]);

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

  const hasLoaded = React.useRef(false);

  useEffect(() => {
    if (hasLoaded.current || !currentCity) return;
    hasLoaded.current = true;

    loadWeatherData(currentCity);
  }, [currentCity]);

  useEffect(() => {
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
