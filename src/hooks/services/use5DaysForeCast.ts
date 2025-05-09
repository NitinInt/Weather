// hooks/use5DayForecastByCoords.ts
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

import {ForecastResponseType} from '@Weather/types/weather';
import {env} from '@Weather/utils/env';

const FORECAST_URL = `${env.WEATHER_API_BASE_URL}/data/2.5/forecast`;
const DEFAULT_STALE_TIME = 300_000; // 5 minute

type PropsType = {
  lat: number;
  lon: number;
  isEnabled?: boolean;
};
const use5DaysForecast = ({lat, lon, isEnabled = true}: PropsType) => {
  const {data, isError, error, isLoading, isFetching} =
    useQuery<ForecastResponseType>({
      queryKey: ['5-day-forecast-coordinates', lat, lon],
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
      enabled: isEnabled && lat !== undefined && lon !== undefined, // only enable if lat and lon are valid
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
  };
};

export default use5DaysForecast;
