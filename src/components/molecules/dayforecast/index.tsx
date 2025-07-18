// DayForecast.tsx
import React, {memo} from 'react';
import styled from 'styled-components/native';

import WeatherIcon from '@Weather/components/atoms/weathericon';

type DayForecastProps = {
  day: string;
  icon: string;
  highTemp: string;
  lowTemp: string;
};

const DayForecast = ({day, icon, highTemp, lowTemp}: DayForecastProps) => {
  return (
    <Container>
      <DayText>{day}</DayText>
      <WeatherIcon icon={icon} />
      <Temperature>
        <HighTemp>{highTemp}</HighTemp> / <LowTemp>{lowTemp}</LowTemp>
      </Temperature>
    </Container>
  );
};

export default memo(DayForecast);
const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  margin-vertical: 4px;
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 8px;
`;

const DayText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const Temperature = styled.Text`
  color: white;
  font-size: 14px;
`;

const HighTemp = styled.Text`
  font-weight: bold;
`;

const LowTemp = styled.Text`
  font-weight: normal;
  color: #ccc;
`;
