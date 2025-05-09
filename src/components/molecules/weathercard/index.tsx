import {memo} from 'react';
import styled from 'styled-components/native';

import {DayWeatherType} from '@Weather/types/weather';

import {convertToTimezone} from '../../../utils/time';
import WithWeatherBackground from '../weatherbackground';

type PropsType = {
  weather: DayWeatherType;
  onPress: (weather: DayWeatherType) => void;
};

const WeatherCard = ({weather, onPress}: PropsType) => {
  const dayWeather = weather.weather[0];
  return WithWeatherBackground({
    weatherCondition: dayWeather?.description,
    isRounded: true,
    children: (
      <Card
        onTouchEnd={() => {
          onPress(weather);
        }}
      >
        <Content>
          <Left>
            <CityName>{weather.name}</CityName>
            <Subtitle>{convertToTimezone(Number(weather.dt_txt))}</Subtitle>
            <Condition>{dayWeather?.description}</Condition>
          </Left>
          <Right>
            <Temp>{weather.main.temp}</Temp>
            <HighLow>
              H:{weather.main.temp_max} L:{weather.main.temp_min}
            </HighLow>
          </Right>
        </Content>
      </Card>
    ),
  });
};

export default memo(WeatherCard);
const Card = styled.View`
  height: 160px;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 16px;
`;

const Content = styled.View`
  flex: 1;
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  z-index: 1;
`;

const Left = styled.View``;

const Right = styled.View`
  align-items: flex-end;
`;

const CityName = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: white;
`;

const Subtitle = styled.Text`
  font-size: 14px;
  color: white;
`;

const Condition = styled.Text`
  font-size: 14px;
  color: white;
  margin-top: 4px;
`;

const Temp = styled.Text`
  font-size: 32px;
  color: white;
`;

const HighLow = styled.Text`
  font-size: 14px;
  color: white;
`;
