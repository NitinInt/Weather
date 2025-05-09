import React, {memo} from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import styled from 'styled-components/native';

const WeatherSkeleton = () => {
  return (
    <Container>
      {/* First block */}
      <BlockWrapper>
        <Block height={40} />
        <Block height={40} />
        <Block height={40} />
      </BlockWrapper>

      {/* Second block */}
      <BlockWrapper>
        <Block height={40} />
        <Block height={40} />
        <Block height={40} />
      </BlockWrapper>
    </Container>
  );
};

export default memo(WeatherSkeleton);

export const Block = styled(SkeletonPlaceholder.Item)<{
  width?: number | string;
  height?: number;
  marginBottom?: number;
  borderRadius?: number;
}>`
  width: '70%';
  height: ${({height}) => (height ? `${height}px` : '20px')};
  margin-bottom: ${({marginBottom}) =>
    marginBottom ? `${marginBottom}px` : '10px'};
  border-radius: ${({borderRadius}) =>
    borderRadius ? `${borderRadius}px` : '10px'};
  background-color: ${({theme}) => theme.colors.secondary};
`;

const Container = styled.SafeAreaView`
  flex: 1;
  padding: 20px;
  justify-content: center;
  background-color: transparent;
  align-items: center;
`;

const BlockWrapper = styled(SkeletonPlaceholder.Item)`
  background-color: ${({theme}) => theme.colors.black};
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 20px;
  height: 200px;
  justify-content: center;
  width: 90%;
`;
