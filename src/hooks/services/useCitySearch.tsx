import {env} from '@Weather/utils/env';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

export type CityType = {
  name: string; // City name
  country: string; // Country code (e.g., "DE", "US")
  state?: string; // Optional state/province
  lat: number; // Useful if you want to fetch weather later
  lon: number;
  displayName?: string; // Optional display name
};

const GEOCODING_URL = `${env.WEATHER_API_BASE_URL}/geo/1.0/direct`;
const DEFAULT_STALE_TIME = 300_000; //5 mins

export const useCitySearch = (query: string) => {
  const {data, error, isError} = useQuery<CityType[]>({
    queryKey: ['city-search', query],
    queryFn: async () => {
      const response = await axios.get<CityType[]>(GEOCODING_URL, {
        params: {
          q: query,
          limit: 5,
          appid: env.WEATHER_API_KEY,
        },
      });
      return response.data;
    },
    enabled: !!query && query.length >= 2,
    staleTime: DEFAULT_STALE_TIME,
  });

  const cities = data
    ? data.map(city => {
        const {name, country, state} = city;
        const displayName = state
          ? `${name}, ${state}, ${country}`
          : `${name}, ${country}`;
        return {
          ...city,
          displayName,
        };
      })
    : [];

  return {
    cities,
    error,
    isError,
  };
};
