import React from 'react';
import {ActivityIndicator, SafeAreaView} from 'react-native';
import styled from 'styled-components/native';

const LoadingIndicator = () => {
  return (
    <Container>
      <ActivityIndicator color="white" size="large" />
    </Container>
  );
};

export default LoadingIndicator;

const Container = styled(SafeAreaView)`
  justify-content: center;
  align-items: center;
  background-color: transparent;
  height: 100px;
`;
