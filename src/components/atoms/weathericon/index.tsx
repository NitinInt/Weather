import {env} from '@Weather/utils/env';
import {memo} from 'react';
import styled from 'styled-components/native';

const WeatherIcon = (icon: string) => {
  return (
    <Icon
      source={{uri: `${env.WEATHER_ICON_URL}/${icon}@2x.png`}}
      resizeMode="contain"
    />
  );
};
export default memo(WeatherIcon);

const Icon = styled.Image`
  height: 20px;
  width: 20px;
`;
