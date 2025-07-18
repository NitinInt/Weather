/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {IntlProvider} from 'react-intl';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-components/native';

import AppStack from './appstack';
import {store} from './store/store';
import {useLocaleStore} from './store/useLocalStore';
import theme from './themes/theme';
import {translations} from './translations';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  const language = useLocaleStore(state => state.language);
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <IntlProvider messages={translations[language]} locale={language}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={{...theme}}>
              <StatusBar />
              <NavigationContainer>
                <AppStack />
              </NavigationContainer>
            </ThemeProvider>
          </QueryClientProvider>
        </IntlProvider>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
