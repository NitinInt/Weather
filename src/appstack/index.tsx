import {createStackNavigator} from '@react-navigation/stack';

import {Screen, WeatherStackParamList} from '../screens/Screen';
import HomeScreen from '../screens/homescreen';
import SearchScreen from '../screens/searchscreen';
import WeatherScreen from '../screens/weathercreen';

const NavigationStack = createStackNavigator<WeatherStackParamList>();

const AppStack = () => {
  return (
    <NavigationStack.Navigator
      initialRouteName={Screen.HomeScreen}
      screenOptions={{headerShown: false}}
    >
      <NavigationStack.Screen name={Screen.HomeScreen} component={HomeScreen} />
      <NavigationStack.Screen
        name={Screen.SearchScreen}
        component={SearchScreen}
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
      <NavigationStack.Screen
        name={Screen.WeatherScreen}
        component={WeatherScreen}
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
    </NavigationStack.Navigator>
  );
};

export default AppStack;
