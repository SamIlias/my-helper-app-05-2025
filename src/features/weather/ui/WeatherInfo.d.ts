import React from 'react';
import { WeatherDataType } from '../api/wheatherApi';
import { WeatherDescription } from '../api/weatherCodes';
type Props = {
    weatherData: WeatherDataType;
    description: WeatherDescription | null;
};
export declare const WeatherInfo: React.FC<Props>;
export {};
