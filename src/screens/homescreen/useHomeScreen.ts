import use5DaysForecast from '@Weather/hooks/services/use5DaysForeCast';
import {DayWeatherType} from '@Weather/types/weather';

import useCurrentCityDetection from '../../hooks/services/useCurrentCityDetection';
import {useTypedNavigation} from '../../hooks/useTypedNavigation';
import {Screen, WeatherStackParamList} from '../Screen';

const useHomeScreen = () => {
  const {navigate} = useTypedNavigation<WeatherStackParamList>();
  const {
    cityName,
    isLoading: cityLoading,
    lat,
    lon,
  } = useCurrentCityDetection();
  const {forecasts, isError, isLoading} = use5DaysForecast({
    lat,
    lon,
    isEnabled: !cityLoading,
  });

  const onSearchPress = () => {
    navigate(Screen.SearchScreen);
  };

  const todayWeather: DayWeatherType | null = forecasts[0]
    ? {
        name: cityName,
        ...forecasts[0],
      }
    : null;

  return {
    onSearchPress,
    weather: todayWeather,
    forecasts,
    isLoading,
    isError,
    cityName,
  };
};

export default useHomeScreen;
