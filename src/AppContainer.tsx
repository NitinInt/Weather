/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {IntlProvider} from 'react-intl';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from 'styled-components/native';

import AppStack from './appstack';
import {useAppSelector} from './hooks/useAppSelector';
import theme from './themes/theme';
import {translations} from './translations';

function AppContainer(): React.JSX.Element {
  const language = useAppSelector(state => state.locale.language);
  return (
    <SafeAreaProvider>
      <IntlProvider messages={translations[language]} locale={language}>
        <ThemeProvider theme={{...theme}}>
          <StatusBar />
          <NavigationContainer>
            <AppStack />
          </NavigationContainer>
        </ThemeProvider>
      </IntlProvider>
    </SafeAreaProvider>
  );
}

export default AppContainer;
