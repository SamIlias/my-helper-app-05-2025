type GeolocationCoords = {
    latitude: number;
    longitude: number;
    accuracy: number;
};
type GeolocationState = {
    coords: GeolocationCoords | null;
    error: string | null;
};
export declare const useGeolocation: () => GeolocationState;
export {};
