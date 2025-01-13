// src/hooks/utility/useGeolocation.ts
import { useState, useEffect } from 'react';

interface GeolocationState {
  loading: boolean;
  error: GeolocationPositionError | Error | null;
  position: {
    latitude: number;
    longitude: number;
    accuracy: number;
  } | null;
}

interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  maximumAge?: number;
  timeout?: number;
}

export const useGeolocation = (options: GeolocationOptions = {}) => {
  const [state, setState] = useState<GeolocationState>({
    loading: true,
    error: null,
    position: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({
        loading: false,
        error: new Error('Geolocation is not supported'), // Keep it as a generic Error
        position: null,
      });
      return;
    }

    const geoSuccess = (position: GeolocationPosition) => {
      setState({
        loading: false,
        error: null,
        position: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        },
      });
    };

    const geoError = (error: GeolocationPositionError) => {
      setState({
        loading: false,
        error, // Store the GeolocationPositionError directly
        position: null,
      });
    };

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, options);
  }, [options.enableHighAccuracy, options.maximumAge, options.timeout]);

  return state;
};
