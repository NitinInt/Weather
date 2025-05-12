import {DayWeatherType} from '@Weather/types/weather';
import {create} from 'zustand';
import {persist} from 'zustand/middleware';

type WeatherStoreType = {
  weatherList: DayWeatherType[];
  addWeather: (data: DayWeatherType) => void;
  removeWeather: (cityName: string) => void;
  clearWeather: () => void;
};

export const useWeatherStore = create<WeatherStoreType>()(
  persist(
    (set, get) => ({
      weatherList: [],
      addWeather: data => {
        const existing = get().weatherList.find(w => w.name === data.name);
        if (!existing) {
          set(state => ({weatherList: [...state.weatherList, data]}));
        }
      },
      removeWeather: cityName => {
        set(state => ({
          weatherList: state.weatherList.filter(w => w.name !== cityName),
        }));
      },
      clearWeather: () => {
        set({weatherList: []});
      },
    }),
    {
      name: 'multi-weather-store',
    },
  ),
);
