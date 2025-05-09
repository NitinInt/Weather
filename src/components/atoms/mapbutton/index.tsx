import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

import MapIcon from '../../../assets/svg/map';

type PropsType = {
  onMapPress: () => void;
};

const MapButton = ({onMapPress}: PropsType) => {
  return (
    <IconButton onPress={onMapPress}>
      <MapIcon />
    </IconButton>
  );
};

export default MapButton;

const IconButton = styled(TouchableOpacity)`
  padding: 8px;
`;
