import {memo} from 'react';
import styled from 'styled-components/native';

import {HourForeCastType} from './type';
import HourForecast from '../../atoms/hourforecast';

type PropsType = {
  description?: string;
  hourlyForecast?: HourForeCastType[];
};

/* 
TODO: fetch the hourly forecast data from an API
Default values for props, can be fetched from an API or passed down from a parent component
*/
const TodayForeCast = ({
  description = ' Partly cloudy conditions expected around 6PM. Wind gusts up to 31 kph are making the temperature feel like 12°.',
  hourlyForecast = [
    {time: 'Now', icon: '🌤', temperature: '15°'},
    {time: '4PM', icon: '🌤', temperature: '15°'},
    {time: '5PM', icon: '🌤', temperature: '15°'},
    {time: '6PM', icon: '🌤', temperature: '15°'},
    {time: '7PM', icon: '🌤', temperature: '15°'},
    {time: '8PM', icon: '🌤', temperature: '15°'},
  ],
}: PropsType) => {
  return (
    <Container>
      <Description>{description}</Description>
      <HourlyScroll horizontal showsHorizontalScrollIndicator={false}>
        {hourlyForecast.map((hour, i) => (
          <HourForecast
            key={i}
            time={hour.time}
            icon={hour.icon}
            temperature={hour.temperature}
          />
        ))}
      </HourlyScroll>
    </Container>
  );
};

export default memo(TodayForeCast);

const Container = styled.View`
  background-color: ${props => props.theme.colors.black};
  margin-top: 40px;
  border-radius: 16px;
  padding: 20px;
`;

const Description = styled.Text`
  color: white;
  margin-bottom: 16px;
`;

const HourlyScroll = styled.ScrollView``;
