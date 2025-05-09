import React, {memo} from 'react';
import {Animated} from 'react-native';
import styled from 'styled-components/native';

import SearchInput from '../../atoms/searchinput';
import DropDownList from '../dropdownlist';
import {ExpandSearchType} from './types';
import useExpandSearch from './useExpandSearch';

const ExpandableSearch: React.FC<ExpandSearchType> = props => {
  const {
    searchRef,
    dropdownHeight,
    horizontalPadding,
    handleSearch,
    handleSelect,
    isInputFocused,
    cities,
    query,
    searchPlaceholder,
  } = useExpandSearch(props);

  return (
    <RootWrapper>
      <AnimatedWrapper
        style={{
          paddingLeft: horizontalPadding,
          paddingRight: horizontalPadding,
        }}
      >
        <SearchArea>
          <SearchInput
            ref={searchRef}
            value={query}
            onSearchInputChange={handleSearch}
            placeholder={searchPlaceholder}
            isActive={isInputFocused}
          />
        </SearchArea>
      </AnimatedWrapper>

      {isInputFocused && (
        <DropdownAnimated style={{height: dropdownHeight}}>
          <DropDownList filteredResults={cities} handleSelect={handleSelect} />
        </DropdownAnimated>
      )}
    </RootWrapper>
  );
};

export default memo(ExpandableSearch);

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
