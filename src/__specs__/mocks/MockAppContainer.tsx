import React from 'react';
import {IntlProvider} from 'react-intl';
import {ThemeProvider} from 'styled-components/native';

import theme from '../../themes/theme.ts';
import {translations} from '../../translations';

type PropsType = {
  children: React.ReactNode;
};

export const MockAppContainer = ({children}: PropsType) => {
  return (
    <ThemeProvider theme={theme}>
      <IntlProvider messages={translations.en} locale={'en'}>
        {children}
      </IntlProvider>
    </ThemeProvider>
  );
};
