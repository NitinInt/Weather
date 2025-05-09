import React from 'react';
import Svg, {Line} from 'react-native-svg';

const Close = () => (
  <Svg width="40" height="40" viewBox="0 0 24 24" fill="none">
    <Line x1="6" y1="6" x2="18" y2="18" stroke="white" strokeWidth="2" />
    <Line x1="18" y1="6" x2="6" y2="18" stroke="white" strokeWidth="2" />
  </Svg>
);

export default Close;
