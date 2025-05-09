import styled from 'styled-components/native';

import Close from '../../../assets/svg/close';

type PropsType = {
  onClosePress: () => void;
};

const CloseButton = ({onClosePress}: PropsType) => {
  return (
    <Container onPress={onClosePress}>
      <Close />
    </Container>
  );
};
export default CloseButton;

const Container = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
  padding: 10px;
`;
