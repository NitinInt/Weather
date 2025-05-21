import ExpandableSearch from '@Weather/components/molecules/expandablesearch';
import {DayWeatherType} from '@Weather/types/weather';
import React from 'react';
import {FlatList, FlatListProps} from 'react-native';
import styled from 'styled-components/native';

import useSearchScreen from './useSearchcreen';
import CloseButton from '../../components/atoms/closebutton';
import WeatherCard from '../../components/molecules/weathercard';
import {useWeatherStore} from '../../store/useWeatherStore';

const keyExtractor = (item: DayWeatherType) => item.name;

const SearchScreen = () => {
  const {onDismissSearch, onSelectWeather, headerTitle, onSelectSearch} =
    useSearchScreen();
  const weatherList = useWeatherStore(state => state.weatherList);

  const renderItem = ({item}: {item: DayWeatherType}) => {
    return <WeatherCard weather={item} onPress={onSelectWeather} />;
  };

  return (
    <SafeArea>
      <Wrapper>
        <CloseButton onClosePress={onDismissSearch} />
        <Header>{headerTitle}</Header>
        <ExpandableSearch onSelect={onSelectSearch} />
        <WeatherList
          data={weatherList}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ItemSeparatorComponent={Separator}
        />
      </Wrapper>
    </SafeArea>
  );
};

export default SearchScreen;

const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.secondary};
`;

const Wrapper = styled.View`
  flex: 1;
`;

const Header = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
  margin-left: 20px;
`;

const TypedList = FlatList<DayWeatherType>;
const WeatherList = styled(TypedList)`
  padding: 0 20px;
`;

const Separator = styled.View`
  height: 12px;
`;
