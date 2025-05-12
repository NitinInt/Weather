// hooks/use5DayForecastByCoords.ts
import {ForecastResponseType} from '@Weather/types/weather';
import {env} from '@Weather/utils/env';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

import useCurrentCityDetection from './useCurrentCityDetection';

const FORECAST_URL = `${env.WEATHER_API_BASE_URL}/data/2.5/forecast`;
const DEFAULT_STALE_TIME = 300_000; // 5 minute

const use5DaysForecast = () => {
  const {lat, lon, cityName} = useCurrentCityDetection();

  const {data, isError, error, isLoading, isFetching} =
    useQuery<ForecastResponseType>({
      queryKey: ['5DayForecast', lat, lon],
      queryFn: async () => {
        const res = await axios.get<ForecastResponseType>(FORECAST_URL, {
          params: {
            lat,
            lon,
            appid: env.WEATHER_API_KEY,
            units: 'metric',
          },
        });
        return res.data;
      },
      enabled: lat !== undefined && lon !== undefined, // only enable if lat and lon are valid
      staleTime: DEFAULT_STALE_TIME, // 1 minute
      retry: 3,
    });

  // Filter the data to get daily forecasts at 12:00:00
  const dailyForecasts = (data?.list ?? []).filter(item =>
    item?.dt_txt?.includes('12:00:00'),
  );

  return {
    forecasts: dailyForecasts,
    isError,
    error,
    isLoading: isLoading || isFetching || (!data && !isError),
    isSuccess: !!data && !isError,
    isRefetching: false,
    cityName,
  };
};

export default use5DaysForecast;
