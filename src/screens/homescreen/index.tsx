import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import ForecastDisplay from '@Weather/components/molecules/forecastdisplay';
import WithWeatherBackground from '@Weather/components/molecules/weatherbackground';
import WeatherBottomToolbar from '@Weather/components/molecules/weatherbottomtoolbar';
import WeatherSkeleton from '@Weather/components/molecules/weatherskeleton';
import Weather from '@Weather/features/weather/components/weather';
import {noop} from '@Weather/utils/const';

import useHomeScreen from './useHomeScreen';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const {onSearchPress, isError, isLoading, weather, forecasts} =
    useHomeScreen();

  const shouldShowDayWeather = !isLoading && weather;
  const shouldShowForeCast = forecasts && !isLoading;

  return WithWeatherBackground({
    weatherCondition: 'Clear',
    children: (
      <Container>
        {isLoading && <WeatherSkeleton />}
        <Content>
          {shouldShowDayWeather && (
            <Weather
              weather={weather}
              isError={isError}
              isLoading={isLoading}
            />
          )}
          {shouldShowForeCast && <ForecastDisplay forecasts={forecasts} />}
        </Content>
        <ToolbarWrapper paddingBottom={insets.bottom}>
          <WeatherBottomToolbar
            onMapPress={noop}
            onSearchPress={onSearchPress}
          />
        </ToolbarWrapper>
      </Container>
    ),
  });
};

export default HomeScreen;

const Container = styled.ImageBackground`
  flex: 1;
  justify-content: space-between;
`;

const Content = styled.View`
  padding: 40px 20px;
  gap: 15px;
`;

const ToolbarWrapper = styled.View<{paddingBottom: number}>`
  position: absolute;
  bottom: ${props => props.paddingBottom}px;
  width: 100%;
  height: ${props => 40 + props.paddingBottom}px;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;
