import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';

import {getWeatherLottie} from '../../../utils/weather';

type PropsType = {
  weatherCondition?: string;
  children: React.ReactNode;
  isRounded?: boolean;
};

const WithWeatherBackground = ({
  weatherCondition = 'clear',
  isRounded = false,
  children,
}: PropsType) => {
  const animationSource = getWeatherLottie(weatherCondition);

  return (
    <Wrapper>
      <StyledLottie
        source={animationSource}
        autoPlay
        loop
        isRounded={isRounded}
      />
      {children}
    </Wrapper>
  );
};

export default WithWeatherBackground;

const Wrapper = styled.View`
  flex: 1;
  position: relative;
  border-radius: 20px;
`;

type LottieViewType = {
  isRounded: boolean;
};
const StyledLottie = styled(LottieView)<LottieViewType>`
  width: 100%;
  height: 100%;
  transform: scale(1);
  background-color: ${({theme}) => theme.colors.primary};
  position: absolute;
  z-index: -1;
  border-radius: ${props => (props.isRounded ? '20px' : '0px')};
`;
