import Svg, {Circle, G, Path, Rect} from 'react-native-svg';

const RefreshIcon = () => {
  return (
    <Svg
      enable-background="new 0 0 32 32"
      height="32px"
      id="svg2"
      viewBox="0 0 32 32"
      width="32px"
    >
      <G id="background">
        <Rect fill="none" height="32" width="32" />
      </G>
      <G id="refresh">
        <Circle cx="16" cy="28" r="4" />
        <Path d="M23.735,27.666L23.735,27.666h-0.002H23.735z M29.999,15.999c-0.002-7.732-6.268-13.999-14-14   C8.267,2,2,8.267,1.999,15.999c0,3.094,1.015,5.964,2.721,8.281L2,27h8v-8l-2.404,2.404C6.589,19.845,6.001,17.998,6,15.999   c0.01-5.521,4.479-9.989,10-10c5.521,0.01,9.989,4.479,9.999,10c0.002,3.483-1.775,6.535-4.479,8.333l2.215,3.333   C27.504,25.163,29.999,20.866,29.999,15.999z" />
      </G>
    </Svg>
  );
};

export default RefreshIcon;
