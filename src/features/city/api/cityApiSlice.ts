import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {defaultCacheTime} from '@Weather/utils/const';
import {env} from '@Weather/utils/env';

import {CityDTO, CityType} from '../models/city';

export const cityApiSlice = createApi({
  reducerPath: 'cityApi',
  baseQuery: fetchBaseQuery({
    baseUrl: env.CURRENT_CITY_URL, // Replace with your actual base})
  }),
  endpoints: builder => {
    return {
      citySearch: builder.query<CityType[], {query: string; limit: number}>({
        query: ({query, limit = 5}) => {
          return {
            url: `${env.WEATHER_API_BASE_URL}/geo/1.0/direct`,
            params: {
              q: query,
              limit,
              appid: env.WEATHER_API_KEY,
            },
          };
        },
        transformResponse: (response: CityDTO[]) => {
          const cities = response
            ? response.map(city => {
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
          return cities;
        },
        keepUnusedDataFor: defaultCacheTime,
      }),
    };
  },
});

export const {useCitySearchQuery} = cityApiSlice;
export default cityApiSlice.reducer;
