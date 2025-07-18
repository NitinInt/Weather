import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';

import ErrorMessage from '@Weather/components/atoms/errormessage';
import LoadingIndicator from '@Weather/components/atoms/loading';
import Expandablesearch from '@Weather/components/template/expandablesearch';
import {DayWeatherType} from '@Weather/types/weather';

import useSearchScreen from './useSearchScreen';
import CloseButton from '../../components/atoms/closebutton';
import WeatherCard from '../../components/molecules/weathercard';
import {useWeatherStore} from '../../store/useWeatherStore';

const keyExtractor = (item: DayWeatherType) => item.name;

const SearchScreen = () => {
  const {
    onDismissSearch,
    onSelectWeather,
    headerTitle,
    onSearch,
    onSelectSearch,
    isError,
    isLoading,
    searchPlaceholder,
    cities,
    errorMessage,
  } = useSearchScreen();
  const weatherList = useWeatherStore(state => state.weatherList);

  const renderItem = ({item}: {item: DayWeatherType}) => {
    return <WeatherCard weather={item} onPress={onSelectWeather} />;
  };

  if (isError) {
    return (
      <Wrapper>
        <ErrorMessage message={errorMessage} />
      </Wrapper>
    );
  }

  if (isLoading) {
    return (
      <Wrapper>
        <LoadingIndicator />
      </Wrapper>
    );
  }

  return (
    <SafeArea>
      <Wrapper>
        <CloseButton onClosePress={onDismissSearch} />
        <Header>{headerTitle}</Header>
        <Expandablesearch
          onSelect={onSelectSearch}
          data={cities}
          onSearch={onSearch}
          placeholder={searchPlaceholder}
        />

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
