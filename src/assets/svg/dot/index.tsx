import React from 'react';
import Svg, {Circle} from 'react-native-svg';

type PropsType = {
  active?: boolean;
};

const Dot = ({active = false}: PropsType) => (
  <Svg width="8" height="8" viewBox="0 0 8 8" fill="none">
    <Circle cx="4" cy="4" r="3" fill="white" opacity={active ? 1 : 0.4} />
  </Svg>
);

export default Dot;
