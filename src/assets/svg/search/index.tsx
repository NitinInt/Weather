import React from 'react';
import Svg, {Circle, Line} from 'react-native-svg';

const SearchIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Circle cx="5" cy="5" r="2" fill="white" />
    <Line x1="8" y1="5" x2="20" y2="5" stroke="white" strokeWidth="2" />

    <Circle cx="5" cy="12" r="2" fill="white" />
    <Line x1="8" y1="12" x2="20" y2="12" stroke="white" strokeWidth="2" />

    <Circle cx="5" cy="19" r="2" fill="white" />
    <Line x1="8" y1="19" x2="20" y2="19" stroke="white" strokeWidth="2" />
  </Svg>
);

export default SearchIcon;
