// WeatherForecastDisplay.tsx
import {TEST_IDS} from '@Weather/__specs__/testIDs';
import {ForeCastsType} from '@Weather/types/weather';
import React, {memo} from 'react';
import styled from 'styled-components/native';

import ForecastList from '../forecastlist';

type PropsType = {
  forecasts: ForeCastsType;
};

const ForecastDisplay = ({forecasts}: PropsType) => {
  return (
    <Container testID={TEST_IDS.FORECAST_DISPLAY}>
      <ForecastList forecasts={forecasts} day={'Today'} />
    </Container>
  );
};

export default memo(ForecastDisplay);

const Container = styled.View`
  background-color: ${props => props.theme.colors.black};
  padding: 20px;
  height: 250px;
  border-radius: 20px;
`;
