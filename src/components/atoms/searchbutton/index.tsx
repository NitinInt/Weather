import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

import SearchIcon from '../../../assets/svg/search';

type PropsType = {
  onSearchPress: () => void;
};

const SearchButton = ({onSearchPress}: PropsType) => {
  return (
    <IconButton onPress={onSearchPress}>
      <SearchIcon />
    </IconButton>
  );
};

export default SearchButton;

const IconButton = styled(TouchableOpacity)`
  padding: 8px;
`;
