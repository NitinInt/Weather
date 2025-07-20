import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';

import {weatherSlice} from '@Weather/features/weather/store/weatherSlice';

import {localeSlice} from './slices/locale/localeSlice';
import {cityApiSlice} from '../features/city/api/cityApiSlice';
import {weatherApiSlice} from '../features/weather/api/weatherApiSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['weather'], // Only persist the weather slice
};

export const rootReducer = combineReducers({
  weather: weatherSlice.reducer,
  locale: localeSlice.reducer,
  [weatherApiSlice.reducerPath]: weatherApiSlice.reducer,
  [cityApiSlice.reducerPath]: cityApiSlice.reducer,
});

const persistRootReducer = persistReducer(persistConfig, rootReducer);

export const apiMiddlewares = [
  weatherApiSlice.middleware,
  cityApiSlice.middleware,
];

export const store = configureStore({
  reducer: persistRootReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(apiMiddlewares);
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStoreType = typeof store;
