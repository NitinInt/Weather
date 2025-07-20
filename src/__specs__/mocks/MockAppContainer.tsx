import {configureStore, Store} from '@reduxjs/toolkit';
import {merge} from 'lodash';
import React from 'react';
import {IntlProvider} from 'react-intl';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-components/native';

import {apiMiddlewares, rootReducer, RootState} from '@Weather/store/store';
import theme from '@Weather/themes/theme';

import {translations} from '../../translations';

const defaultMockState: Partial<RootState> = {
  weather: {
    weatherList: [], // Customize here
  },
  locale: {
    language: '',
  },
};

type PropsType = {
  children?: React.ReactNode;
  store?: Store<RootState>;
  mockState?: Partial<RootState>;
};

export const setupMockState = (
  mockState: Partial<Record<keyof RootState, object>> = {},
) => {
  return merge(defaultMockState, mockState);
};

export const setupStore = (
  preloadedState?: Partial<RootState>,
): Store<RootState> => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(apiMiddlewares),
    preloadedState,
  });
};

export const MockAppContainer = ({
  children,
  mockState = {},
  store = setupStore(setupMockState(mockState)),
}: PropsType) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <IntlProvider messages={translations.en} locale={'en'}>
          {children}
        </IntlProvider>
      </ThemeProvider>
    </Provider>
  );
};
