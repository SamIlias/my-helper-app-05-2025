import { fetchWeatherApi } from 'openmeteo';
import { getCoordinatesApi } from '../getCoordinatesApi.ts';

const url = 'https://api.open-meteo.com/v1/forecast';

export const fetchWeather = async (city: string) => {
  const { latitude, longitude, country, name } = await getCoordinatesApi(city);

  const params = {
    latitude,
    longitude,
    current: 'temperature_2m,weather_code,wind_speed_10m,wind_direction_10m',
    // hourly: 'temperature_2m,precipitation',
    // daily: 'weather_code,temperature_2m_max,temperature_2m_min',
  };

  const responses = await fetchWeatherApi(url, params);
  const response = responses[0];
  const current = response.current()!;
  const utcOffsetSeconds = response.utcOffsetSeconds();

  return {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature: current.variables(0)!.value().toFixed(1),
      weatherCode: current.variables(1)!.value(),
      windSpeed: current.variables(2)!.value().toFixed(1),
      windDirection: current.variables(3)!.value().toFixed(1),
    },
    country: country,
    cityName: name,
  };
};

// types ----------------------------------------
export type WeatherDataType = {
  current: {
    time: Date;
    temperature: string;
    weatherCode: number;
    windSpeed: string;
    windDirection: string;
  };
  country: string;
  cityName: string;
};
