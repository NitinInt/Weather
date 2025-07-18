import {useCallback, useEffect, useRef, useState} from 'react';
import {Dimensions, Animated, Keyboard} from 'react-native';
import {useDebouncedCallback} from 'use-debounce';

import {WithDisplayName} from '@Weather/components/types';

import {ExpandSearchType} from './types';
import {SearchRefType} from '../../../components/atoms/searchinput/types';

const screenHeight = Dimensions.get('window').height;
const useExpandSearch = <T extends WithDisplayName>({
  onSelect,
  placeholder,
  data,
  onSearch,
}: ExpandSearchType<T>) => {
  const [query, setQuery] = useState('');
  const searchRef = useRef<SearchRefType>(null);

  const dropdownHeight = useRef(new Animated.Value(screenHeight)).current;
  const horizontalPadding = useRef(new Animated.Value(20)).current;

  const handleSearch = (text: string) => {
    onSearch(text);
    searchRef?.current?.clear();
  };

  const handleSelect = (item: T) => {
    const cityName = item?.displayName ?? '';
    Keyboard.dismiss();
    searchRef.current?.blur();
    handleSearch(cityName);
    onSelect(item);
  };

  const isInputFocused =
    (searchRef.current?.isFocused() ?? false) && data.length > 0;
  const shouldShowDropdown = isInputFocused && data.length > 0;
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
    data,
    query,
    setQuery,
    animateHorizontalPadding,
    onSearch,
    shouldShowDropdown,
    placeholder,
  };
};

export default useExpandSearch;
