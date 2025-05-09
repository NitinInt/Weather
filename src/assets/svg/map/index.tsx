import React from 'react';
import Svg, {Path} from 'react-native-svg';

const MapIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 2L15 4L21 2V20L15 22L9 20L3 22V4L9 2Z"
      stroke="white"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <Path d="M9 2V20" stroke="white" strokeWidth="2" />
    <Path d="M15 4V22" stroke="white" strokeWidth="2" />
  </Svg>
);

export default MapIcon;
