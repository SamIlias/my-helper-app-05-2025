import { useState, useEffect } from 'react';

type GeolocationCoords = {
  latitude: number;
  longitude: number;
  accuracy: number;
};

type GeolocationState = {
  coords: GeolocationCoords | null;
  error: string | null;
};

export const useGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    coords: null,
    error: null,
  });

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setState({ coords: null, error: 'Geolocation is not supported' });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setState({
          coords: { latitude, longitude, accuracy },
          error: null,
        });
      },
      (error) => {
        setState({ coords: null, error: error.message });
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  }, []);

  return state;
};
