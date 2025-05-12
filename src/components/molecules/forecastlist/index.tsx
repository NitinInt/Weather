// FiveDayForecastList.tsx
import {ForeCastsType, ForeCastType} from '@Weather/types/weather';
import {dayFromDate} from '@Weather/utils/time';
import React, {memo} from 'react';
import {useIntl} from 'react-intl';
import {FlatList, FlatListProps} from 'react-native';
import styled from 'styled-components/native';

import DayForecast from '../dayforecast';

type PropsType = {
  forecasts: ForeCastsType;
  day: string;
};

const ForecastList = ({forecasts, day}: PropsType) => {
  const intl = useIntl();
  return (
    <Container>
      <Title>{intl.formatMessage({id: 'FutureForecastTitle'})}</Title>
      <List
        data={forecasts}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <DayForecast
            day={dayFromDate(item?.dt_txt)}
            icon={item.weather[0]?.icon ?? ''}
            highTemp={`${item.main.temp_max}°`}
            lowTemp={`${item.main.temp_min}°`}
          />
        )}
        keyExtractor={(item, index) => index.toString() + item.main.feels_like}
      />
    </Container>
  );
};

export default memo(ForecastList);

const Container = styled.View`
  padding: 16px;
`;

const Title = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const List = styled(
  FlatList as new (
    props: FlatListProps<ForeCastType>,
  ) => FlatList<ForeCastType>,
)``;
