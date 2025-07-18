import {useGet5DaysForecastQuery} from '@Weather/features/weather/api/weatherApiSlice';
import {DayWeatherType} from '@Weather/features/weather/models/weather';
import useDeviceLocation from '@Weather/hooks/useDeviceLocation';

import {useTypedNavigation} from '../../hooks/useTypedNavigation';
import {Screen, WeatherStackParamList} from '../Screen';

const useHomeScreen = () => {
  const {navigate} = useTypedNavigation<WeatherStackParamList>();
  const {deviceCurrentLocation} = useDeviceLocation();

  const {
    data: forecastData,
    isError,
    isLoading,
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
