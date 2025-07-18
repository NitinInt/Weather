import {useGetDayWeatherQuery} from '@Weather/features/weather/api/weatherApiSlice';
import {DayWeatherType} from '@Weather/features/weather/models/weather';
import {addWeather} from '@Weather/features/weather/store/weatherSlice';
import {useAppDispatch} from '@Weather/hooks/useAppDispatch';

import {useTypedNavigation} from '../../hooks/useTypedNavigation';
import {WeatherStackParamList} from '../Screen';

type PropsType = {
  city: string;
  dayWeather?: DayWeatherType;
};

const useWeatherScreen = ({city, dayWeather}: PropsType) => {
  const navigation = useTypedNavigation<WeatherStackParamList>();
  const {data: weather, isError, isLoading} = useGetDayWeatherQuery({city});
  const dispatch = useAppDispatch();

  const onSave = () => {
    navigation.goBack();
    if (weather) {
      dispatch(addWeather(weather));
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
