// hooks/useWeather.ts
import {DayWeatherType} from '@Weather/types/weather';
import {env} from '@Weather/utils/env';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

const WEATHER_URL = `${env.WEATHER_API_BASE_URL}/data/2.5/weather`;
const DEFAULT_STALE_TIME = 120_000; //

type PropsType = {
  city?: string;
  isEnabled?: boolean;
};

export const useWeather = ({city, isEnabled = true}: PropsType) => {
  const {data, isError, error, isLoading, isFetching} =
    useQuery<DayWeatherType>({
      queryKey: ['current-weather', city],
      queryFn: async () => {
        const res = await axios.get<DayWeatherType>(WEATHER_URL, {
          params: {
            q: city,
            appid: env.WEATHER_API_KEY,
            units: 'metric',
          },
        });
        return res.data;
      },
      enabled: !!city && isEnabled,
      staleTime: DEFAULT_STALE_TIME,
      retry: 3,
    });

  return {
    weather: data,
    isError,
    error,
    isLoading: isLoading || isFetching || (!data && !isError),
    isSuccess: !!data && !isError,
    isRefetching: false,
  };
};
