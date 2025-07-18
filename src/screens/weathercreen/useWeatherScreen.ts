import {useGetDayWeatherQuery} from '@Weather/features/weather/api/weatherApiSlice';
import {DayWeatherType} from '@Weather/types/weather';

import {useTypedNavigation} from '../../hooks/useTypedNavigation';
import {useWeatherStore} from '../../store/useWeatherStore';
import {WeatherStackParamList} from '../Screen';

type PropsType = {
  city: string;
  dayWeather?: DayWeatherType;
};

const useWeatherScreen = ({city, dayWeather}: PropsType) => {
  const navigation = useTypedNavigation<WeatherStackParamList>();
  const {data: weather, isError, isLoading} = useGetDayWeatherQuery({city});
  const addWeather = useWeatherStore(store => store.addWeather);
  const onSave = () => {
    navigation.goBack();
    if (weather) {
      addWeather(weather);
    }
  };

  console.log('useWeatherScreen===', weather);

  const onClose = () => {
    navigation.goBack();
  };

  return {
    onSave,
    onClose,
    weather: dayWeather ?? weather,
    isError,
    isLoading: isLoading && !dayWeather && !weather,
  };
};

export default useWeatherScreen;
