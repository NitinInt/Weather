import React, {memo} from 'react';
import styled from 'styled-components/native';

import Dot from '../../../assets/svg/dot';

type PropsType = {
  total: number;
  activeIndex: number;
};

const DotPagination = ({total, activeIndex}: PropsType) => {
  return (
    <Container>
      {Array.from({length: total}).map((_, index) => (
        <Dot key={index} active={index === activeIndex} />
      ))}
    </Container>
  );
};

export default memo(DotPagination);

const Container = styled.View`
  height: 24px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
