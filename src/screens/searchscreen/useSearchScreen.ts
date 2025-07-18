import {useRef, useState} from 'react';
import {useIntl} from 'react-intl';
import {Keyboard} from 'react-native';
import {useDebouncedCallback} from 'use-debounce';

import {SearchRefType} from '@Weather/components/atoms/searchinput/types';
import {CityType, useCitySearchQuery} from '@Weather/features/city';
import {DayWeatherType} from '@Weather/features/weather/models/weather';

import {useTypedNavigation} from '../../hooks/useTypedNavigation';
import {Screen, WeatherStackParamList} from '../Screen';

const useSearchScreen = () => {
  const navigation = useTypedNavigation<WeatherStackParamList>();
  const [query, setQuery] = useState('');
  const intl = useIntl();
  const searchRef = useRef<SearchRefType>(null);
  const {data, isError, isLoading} = useCitySearchQuery(
    {query, limit: 10},
    {skip: !query},
  );

  const cities = data ?? [];

  const errorMessage = intl.formatMessage({id: 'PlaceHolderErrorMessage'});

  const searchPlaceholder = intl.formatMessage({id: 'SearchPlaceholder'});

  const setSearchQuery = useDebouncedCallback(val => {
    setQuery(val);
  }, 100);

  const onSearch = (text: string) => {
    setSearchQuery(text);
    searchRef?.current?.clear();
  };

  const onSelectSearch = (item: CityType) => {
    const cityName = item?.displayName ?? '';
    Keyboard.dismiss();
    searchRef.current?.blur();
    onSearch(cityName);
    navigation.navigate(Screen.WeatherScreen, {
      city: item.name,
    });
  };

  const onDismissSearch = () => {
    navigation.goBack();
  };

  const onSelectWeather = (weather: DayWeatherType) => {
    navigation.navigate(Screen.WeatherScreen, {
      dayWeather: weather,
    });
  };

  return {
    onDismissSearch,
    onSelectWeather,
    onSelectSearch,
    headerTitle: intl.formatMessage({
      id: 'Weather',
    }),
    onSearch,
    cities,
    searchPlaceholder,
    isError,
    isLoading,
    errorMessage,
  };
};
export default useSearchScreen;
