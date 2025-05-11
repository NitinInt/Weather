import {useCallback, useEffect, useRef, useState} from 'react';
import {useIntl} from 'react-intl';
import {Dimensions, Animated, Keyboard} from 'react-native';
import {useDebouncedCallback} from 'use-debounce';

import {ExpandSearchType} from './types';
import {CityType, useCitySearch} from '../../../hooks/services/useCitySearch';
import {SearchRefType} from '../../atoms/searchinput/types';

const screenHeight = Dimensions.get('window').height;
const useExpandSearch = ({onSelect, placeholder}: ExpandSearchType) => {
  const [query, setQuery] = useState('');
  const intl = useIntl();
  const searchRef = useRef<SearchRefType>(null);
  const {cities} = useCitySearch(query);
  const dropdownHeight = useRef(new Animated.Value(screenHeight)).current;
  const horizontalPadding = useRef(new Animated.Value(20)).current;
  const searchPlaceholder =
    placeholder ?? intl.formatMessage({id: 'SearchPlaceholder'});

  const onSearch = useDebouncedCallback(val => {
    setQuery(val);
  }, 100);

  const handleSearch = (text: string) => {
    onSearch(text);
    searchRef?.current?.clear();
  };

  const handleSelect = (item: CityType) => {
    const cityName = item?.displayName ?? '';
    Keyboard.dismiss();
    searchRef.current?.blur();
    handleSearch(cityName);
    onSelect(item);
  };

  const isInputFocused =
    (searchRef.current?.isFocused() ?? false) && cities.length > 0;
  const shouldShowDropdown = isInputFocused && cities.length > 0;
  const animateDropdown = useCallback(
    (show: boolean) => {
      const screenHeight = Dimensions.get('window').height;
      const maxDropdownHeight = screenHeight * 0.9; // Adjust this ratio if needed

      Animated.timing(dropdownHeight, {
        toValue: show ? maxDropdownHeight : 0,
        duration: 600,
        useNativeDriver: false,
      }).start();
    },
    [dropdownHeight],
  );

  const animateHorizontalPadding = useCallback(
    (focused: boolean) => {
      Animated.timing(horizontalPadding, {
        toValue: focused ? 0 : 20,
        duration: 600,
        useNativeDriver: false,
      }).start();
    },
    [horizontalPadding],
  );

  const handleAnimation = useDebouncedCallback(() => {
    animateDropdown(isInputFocused);
    animateHorizontalPadding(isInputFocused);
  }, 100);

  useEffect(() => {
    handleAnimation();
  }, [
    animateDropdown,
    animateHorizontalPadding,
    handleAnimation,
    isInputFocused,
  ]);

  return {
    searchRef,
    dropdownHeight,
    horizontalPadding,
    handleSearch,
    handleSelect,
    isInputFocused,
    cities,
    query,
    setQuery,
    animateHorizontalPadding,
    onSearch,
    searchPlaceholder,
    shouldShowDropdown,
  };
};

export default useExpandSearch;
