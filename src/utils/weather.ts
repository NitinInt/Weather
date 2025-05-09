//TODO: all are mock animation, can have better weather images for background which relate with current weather
const weatherLottieMap: {[key: string]: any} = {
  Clear: require('../assets/lottie/sun.json'),
  Clouds: require('../assets/lottie/cloudly.json'),
  Rain: require('../assets/lottie/rain.json'),
  Drizzle: require('../assets/lottie/rain.json'),
  Thunderstorm: require('../assets/lottie/thunder_rain.json'),
  Snow: require('../assets/lottie/snow.json'),
  Mist: require('../assets/lottie/fog.json'),
  Smoke: require('../assets/lottie/fog.json'),
  Haze: require('../assets/lottie/fog.json'),
  Dust: require('../assets/lottie/fog.json'),
  Fog: require('../assets/lottie/fog.json'),
  Sand: require('../assets/lottie/fog.json'),
  Ash: require('../assets/lottie/fog.json'),
  Squall: require('../assets/lottie/fog.json'),
  Tornado: require('../assets/lottie/wind.json'),
};

// Define a type for the possible weather animations
type WeatherAnimation =
  | 'Clouds'
  | 'Rain'
  | 'Thunderstorm'
  | 'Snow'
  | 'Fog'
  | 'Tornado'
  | 'Clear';

// Define the weatherKeywords object with proper types
const weatherKeywords: {[key: string]: WeatherAnimation} = {
  cloud: 'Clouds',
  rain: 'Rain',
  drizzle: 'Rain',
  thunderstorm: 'Thunderstorm',
  snow: 'Snow',
  mist: 'Fog',
  fog: 'Fog',
  smoke: 'Fog',
  haze: 'Fog',
  dust: 'Fog',
  sand: 'Fog',
  ash: 'Fog',
  squall: 'Fog',
  tornado: 'Tornado',
};

export const getWeatherLottie = (weatherMain: string): any => {
  const weatherMainLower = weatherMain?.toLowerCase() || '';

  for (const keyword in weatherKeywords) {
    if (weatherMainLower.includes(keyword)) {
      return weatherLottieMap[weatherKeywords[keyword]];
    }
  }
  return weatherLottieMap.Rain;
};
