import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {DayWeatherType} from '../models/weather';

type WeatherState = {
  weatherList: DayWeatherType[];
};

const initialState: WeatherState = {
  weatherList: [],
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    addWeather: (state, action: PayloadAction<DayWeatherType>) => {
      const existing = state.weatherList.find(
        w => w.name === action.payload.name,
      );
      if (!existing) {
        state.weatherList.push(action.payload);
      }
    },
    removeWeather: (state, action: PayloadAction<string>) => {
      state.weatherList = state.weatherList.filter(
        w => w.name !== action.payload,
      );
    },
    clearWeather: state => {
      state.weatherList = [];
    },
  },
});

export const {addWeather, removeWeather, clearWeather} = weatherSlice.actions;
export default weatherSlice.reducer;
