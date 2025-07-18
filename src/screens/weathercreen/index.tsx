import {RouteProp, useRoute} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

import useWeatherScreen from './useWeatherScreen';
import Close from '../../assets/svg/close';
import PlusIcon from '../../assets/svg/plus';
import WithWeatherBackground from '../../components/molecules/weatherbackground';
import Weather from '../../features/weather/components/weather';
import {Screen, WeatherStackParamList} from '../Screen';

const WeatherScreen = () => {
  const route =
    useRoute<RouteProp<WeatherStackParamList, Screen.WeatherScreen>>();

  const {city = '', dayWeather} = route.params;
  const {onSave, onClose, weather, isError, isLoading} = useWeatherScreen({
    city,
    dayWeather,
  });

  const renderActionButton = () => {
    return isError || dayWeather ? (
      <RoundButton onPress={onClose}>
        <Close />
      </RoundButton>
    ) : (
      <RoundButton onPress={onSave}>
        <PlusIcon />
      </RoundButton>
    );
  };

  return WithWeatherBackground({
    weatherCondition: weather?.weather[0]?.description,
    children: (
      <Container>
        <TopButtonsWrapper>{renderActionButton()}</TopButtonsWrapper>
        <Weather weather={weather} isError={isError} isLoading={isLoading} />
      </Container>
    ),
  });
};

export default WeatherScreen;

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const TopButtonsWrapper = styled.View`
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  z-index: 1000;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 20px;
`;

const RoundButton = styled(TouchableOpacity)`
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
`;
