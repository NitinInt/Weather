import {forwardRef} from 'react';
import {TextInput, TextInputProps} from 'react-native';
import styled from 'styled-components/native';

type PropsType = {
  placeholder?: string;
  isActive?: boolean;
  onSearchInputChange: (value: string) => void;
} & TextInputProps;

const SearchInput = forwardRef<TextInput, PropsType>(
  ({placeholder, onSearchInputChange, isActive = false}, ref) => {
    return (
      <SearchContainer>
        <StyledInput
          ref={ref}
          autoFocus
          onChangeText={onSearchInputChange}
          placeholder={placeholder ?? 'Search...'}
          placeholderTextColor="white"
          isFocused={isActive}
        />
      </SearchContainer>
    );
  },
);

export default SearchInput;

const SearchContainer = styled.View`
  padding-vertical: 10px;
  height: 50px;
  width: 100%;
`;

type StyledInputProps = {
  isFocused: boolean;
};

const StyledInput = styled(TextInput)<StyledInputProps>`
  height: 50px;
  background-color: rgba(119, 175, 232, 0.7);
  padding: 0 16px;
  color: white;
  font-size: 16px;
  color: white;
  border-radius: ${props => (props.isFocused ? '0px' : '10px')};
`;
