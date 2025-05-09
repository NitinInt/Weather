import {NavigationProp, useNavigation} from '@react-navigation/native';

export const useTypedNavigation = <T extends object>() => {
  const navigation = useNavigation<NavigationProp<T>>();

  return navigation;
};
