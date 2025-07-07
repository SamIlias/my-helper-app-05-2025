export declare const fetchWeather: (city: string) => Promise<{
    current: {
        time: Date;
        temperature: string;
        weatherCode: number;
        windSpeed: string;
        windDirection: string;
    };
    country: any;
    cityName: any;
}>;
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
