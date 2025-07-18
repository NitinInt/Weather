import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {defaultCacheTime} from '@Weather/utils/const';
import {env} from '@Weather/utils/env';

import {
  ForeCastType,
  ForecastResponseDTO,
  DayWeatherType,
} from '../models/weather';

function getUniqueDailyForecast(forecastList: ForeCastType[]) {
  const seenDates = new Set<string>();

  return forecastList.filter(entry => {
    const dateStr = entry.dt_txt.split(' ')[0]; // Extract "YYYY-MM-DD"

    if (dateStr && !seenDates.has(dateStr)) {
      seenDates.add(dateStr);
      return true;
    }

    return false;
  });
}

export const weatherApiSlice = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: env.WEATHER_API_BASE_URL,
  }),
  endpoints: builder => {
    return {
      get5DaysForecast: builder.query<
        ForecastResponseDTO,
        {lat?: number; lon?: number}
      >({
        query: ({lat = 0, lon = 0}) =>
          `${env.WEATHER_API_BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${env.WEATHER_API_KEY}&units=metric`,
        keepUnusedDataFor: defaultCacheTime, // 5 minutes
        transformResponse: (response: ForecastResponseDTO) => {
          // transform resposne such that it returns 5 days weather but have only one entry for each day
          const uniqueDailyForecasts = getUniqueDailyForecast(response.list);
          return {
            ...response,
            list: uniqueDailyForecasts,
          };
        },
      }),
      getDayWeather: builder.query<DayWeatherType, {city: string}>({
        query: ({city}) => {
          return {
            url: `${env.WEATHER_API_BASE_URL}/data/2.5/weather?`,
            params: {
              q: city,
              appid: env.WEATHER_API_KEY,
              units: 'metric',
            },
          };
        },

        keepUnusedDataFor: defaultCacheTime,
      }),
    };
  },
});

export const {useGet5DaysForecastQuery, useGetDayWeatherQuery} =
  weatherApiSlice;
