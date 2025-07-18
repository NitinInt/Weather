import {DayWeatherType} from '@Weather/features/weather/models/weather';

export enum Screen {
  HomeScreen = 'HomeScreen',
  SearchScreen = 'SearchScreen',
  WeatherScreen = 'WeatherScreen',
}

export type WeatherStackParamList = {
  [Screen.HomeScreen]: undefined;
  [Screen.SearchScreen]: undefined;
  [Screen.WeatherScreen]: {
    city?: string;
    dayWeather?: DayWeatherType;
  };
};
