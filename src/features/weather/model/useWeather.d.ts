import { WeatherDataType } from '../api/wheatherApi';
import { WeatherDescription } from '../api/weatherCodes';
export declare const useWeather: () => {
    weatherData: WeatherDataType | null;
    onSubmit: (cityName: string) => void;
    errorMessage: string | null;
    description: WeatherDescription | null;
};
