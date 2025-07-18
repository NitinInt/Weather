import {configureStore} from '@reduxjs/toolkit';

import {weatherSlice} from '@Weather/features/weather/store/weatherSlice';

import {localeSlice} from './slices/locale/localeSlice';
import {cityApiSlice} from '../features/city/api/cityApiSlice';
import {weatherApiSlice} from '../features/weather/api/weatherApiSlice';

const apiMiddlewares = [weatherApiSlice.middleware, cityApiSlice.middleware];

export const store = configureStore({
  reducer: {
    weather: weatherSlice.reducer,
    locale: localeSlice.reducer,
    [weatherApiSlice.reducerPath]: weatherApiSlice.reducer,
    [cityApiSlice.reducerPath]: cityApiSlice.reducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(apiMiddlewares);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
