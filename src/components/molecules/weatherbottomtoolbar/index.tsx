import {TEST_IDS} from '@Weather/__specs__/testIDs';
import {memo} from 'react';
import styled from 'styled-components/native';

import MapButton from '../../atoms/mapbutton';
import SearchButton from '../../atoms/searchbutton';
import DotPagination from '../dotpagination';

type PropsType = {
  onMapPress: () => void;
  onSearchPress: () => void;
  totalPages?: number;
};

const DefaultPageIndex = 0;

const WeatherBottomToolbar = ({
  onMapPress,
  onSearchPress,
  totalPages = 5,
}: PropsType) => {
  return (
    <Container testID={TEST_IDS.BOTTOM_TOOLBAR}>
      <MapButton onMapPress={onMapPress} />
      <DotPagination total={totalPages} activeIndex={DefaultPageIndex} />
      <SearchButton onSearchPress={onSearchPress} />
    </Container>
  );
};

export default memo(WeatherBottomToolbar);

const Container = styled.View`
  position: absolute;
  bottom: 0;
  height: 40px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background-color: transparent;
`;
