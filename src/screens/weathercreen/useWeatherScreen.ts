import {DayWeatherType} from '@Weather/types/weather';

import {useWeather} from '../../hooks/services/useWeather';
import {useTypedNavigation} from '../../hooks/useTypedNavigation';
import {useWeatherStore} from '../../store/useWeatherStore';
import {WeatherStackParamList} from '../Screen';

type PropsType = {
  city?: string;
  dayWeather?: DayWeatherType;
};

const useWeatherScreen = ({city, dayWeather}: PropsType) => {
  const navigation = useTypedNavigation<WeatherStackParamList>();
  const {weather, isError, isLoading} = useWeather({
    city,
    isEnabled: !dayWeather && !!city,
  });
  const addWeather = useWeatherStore(store => store.addWeather);
  const onSave = () => {
    navigation.goBack();
    if (weather) {
      addWeather(weather);
    }
  };

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
