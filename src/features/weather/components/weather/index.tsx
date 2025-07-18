import {useIntl} from 'react-intl';
import styled from 'styled-components/native';

import {TEST_IDS} from '@Weather/__specs__/testIDs';
import {DayWeatherType} from '@Weather/types/weather';

import ErrorMessage from '../../../../components/atoms/errormessage';
import LoadingIndicator from '../../../../components/atoms/loading';
import TodayForeCast from '../../../../components/molecules/todayforecast';

type PropsType = {
  weather?: DayWeatherType;
  isLoading: boolean;
  isError: boolean;
};

const Weather = ({weather, isError, isLoading}: PropsType) => {
  const intl = useIntl();
  if (isLoading) {
    return (
      <Content>
        <LoadingIndicator />
      </Content>
    );
  }
  if (isError) {
    return (
      <Content>
        <ErrorMessage
          message={intl.formatMessage({id: 'PlaceHolderErrorMessage'})}
        />
      </Content>
    );
  }

  if (!weather) {
    return (
      <Content>
        <ErrorMessage message={intl.formatMessage({id: 'NoDataFound'})} />
      </Content>
    );
  }
  return (
    <Content testID={TEST_IDS.WEATHER_GENERAL_VIEW}>
      <CityName>{weather.name}</CityName>
      <Temp>{weather.main.temp}</Temp>
      <InfoText>{weather.main.feels_like}</InfoText>
      <InfoText>{`H:${weather.main.temp_max} L:${weather.main.temp_min}`}</InfoText>
      <ExtraInfo>
        <InfoText>💧 Humidity: {weather.main.humidity}%</InfoText>
        <InfoText>💨 Wind: {weather.wind.speed} m/s</InfoText>
      </ExtraInfo>
      <TodayForeCast />
    </Content>
  );
};
export default Weather;

const Content = styled.SafeAreaView`
  padding: 40px 20px;
`;

const CityName = styled.Text`
  font-size: 28px;
  color: white;
  text-align: center;
  font-weight: bold;
  margin-top: 20px;
`;

const Temp = styled.Text`
  font-size: 42px;
  color: white;
  text-align: center;
  font-weight: 400;
`;

const ExtraInfo = styled.View`
  margin-top: 12px;
`;

const InfoText = styled.Text`
  font-size: 16px;
  color: white;
  text-align: center;
  font-weight: 00;
`;
