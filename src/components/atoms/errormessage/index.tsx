import React from 'react';
import styled from 'styled-components/native';

type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({message}: ErrorMessageProps) => {
  return <ErrorText>{message}</ErrorText>;
};

export default ErrorMessage;

const ErrorText = styled.Text`
  color: red;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  padding: 10px;
  color: white;
  border-radius: 5px;
  height: 100px;
`;
