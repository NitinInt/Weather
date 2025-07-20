import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';

import {weatherSlice} from '@Weather/features/weather/store/weatherSlice';

import {localeSlice} from './slices/locale/localeSlice';
import {cityApiSlice} from '../features/city/api/cityApiSlice';
import {weatherApiSlice} from '../features/weather/api/weatherApiSlice';

export const rootReducer = combineReducers({
  weather: weatherSlice.reducer,
  locale: localeSlice.reducer,
  [weatherApiSlice.reducerPath]: weatherApiSlice.reducer,
  [cityApiSlice.reducerPath]: cityApiSlice.reducer,
});

export const apiMiddlewares = [
  weatherApiSlice.middleware,
  cityApiSlice.middleware,
];

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(apiMiddlewares);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStoreType = typeof store;
