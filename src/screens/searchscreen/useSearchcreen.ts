import {useIntl} from 'react-intl';

import {DayWeatherType} from '@Weather/types/weather';

import {CityType} from '../../hooks/services/useCitySearch';
import {useTypedNavigation} from '../../hooks/useTypedNavigation';
import {Screen, WeatherStackParamList} from '../Screen';

const useSearchScreen = () => {
  const navigation = useTypedNavigation<WeatherStackParamList>();
  const intl = useIntl();

  const onDismissSearch = () => {
    navigation.goBack();
  };

  const onSelectWeather = (weather: DayWeatherType) => {
    navigation.navigate(Screen.WeatherScreen, {
      dayWeather: weather,
    });
  };

  const onSelectSearch = (city: CityType) => {
    navigation.navigate(Screen.WeatherScreen, {
      city: city.name,
    });
  };

  return {
    onDismissSearch,
    onSelectWeather,
    onSelectSearch,
    headerTitle: intl.formatMessage({
      id: 'Weather',
    }),
  };
};
export default useSearchScreen;
