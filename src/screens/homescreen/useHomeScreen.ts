import {useGet5DaysForecastQuery} from '@Weather/features/weather/api/weatherApiSlice';
import useDeviceLocation from '@Weather/hooks/useDeviceLocation';
import {DayWeatherType} from '@Weather/types/weather';

import {useTypedNavigation} from '../../hooks/useTypedNavigation';
import {Screen, WeatherStackParamList} from '../Screen';

const useHomeScreen = () => {
  const {navigate} = useTypedNavigation<WeatherStackParamList>();
  const {deviceCurrentLocation} = useDeviceLocation();

  const {
    data: forecastData,
    isError,
    isLoading,
    error,
  } = useGet5DaysForecastQuery({
    lat: deviceCurrentLocation.lat,
    lon: deviceCurrentLocation.lon,
  });

  const onSearchPress = () => {
    navigate(Screen.SearchScreen);
  };

  const forecasts = forecastData?.list ?? [];
  const cityName = forecastData?.city.name ?? '';

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
