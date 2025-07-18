import React, {memo} from 'react';
import {Animated} from 'react-native';
import styled from 'styled-components/native';

import SearchInput from '@Weather/components/atoms/searchinput';
import Dropdownlist from '@Weather/components/molecules/dropdownlist';
import {WithDisplayName} from '@Weather/components/types';

import {ExpandSearchType} from './types';
import useExpandSearch from './useExpandSearch';

const ExpandableSearch = <T extends WithDisplayName>(
  props: ExpandSearchType<T>,
) => {
  const {
    searchRef,
    dropdownHeight,
    horizontalPadding,
    handleSearch,
    handleSelect,
    isInputFocused,
    data,
    query,
    shouldShowDropdown,
    placeholder,
  } = useExpandSearch(props);

  return (
    <RootWrapper>
      <AnimatedWrapper
        style={{
          paddingLeft: horizontalPadding,
          paddingRight: horizontalPadding,
        }}>
        <SearchArea>
          <SearchInput
            ref={searchRef}
            value={query}
            onSearchInputChange={handleSearch}
            placeholder={placeholder}
            isActive={isInputFocused}
          />
        </SearchArea>
      </AnimatedWrapper>

      {shouldShowDropdown && (
        <DropdownAnimated style={{height: dropdownHeight}}>
          <Dropdownlist<T> filteredResults={data} handleSelect={handleSelect} />
        </DropdownAnimated>
      )}
    </RootWrapper>
  );
};

export default memo(ExpandableSearch) as unknown as typeof ExpandableSearch;

const RootWrapper = styled.View`
  width: 100%;
  z-index: 1000;
  margin-vertical: 10px;
`;

const AnimatedWrapper = styled(Animated.View)`
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
`;

const SearchArea = styled.View`
  z-index: 10;
`;

const DropdownAnimated = styled(Animated.View)`
  background-color: ${props => props.theme.colors.primary};
  padding: 10px;
  z-index: 1000;
`;
