// WeatherScreen.test.tsx
import {useRoute} from '@react-navigation/native';
import {render} from '@testing-library/react-native';
import React from 'react';

import {MockAppContainer} from '@Weather/__specs__/mocks/MockAppContainer';
import {DayWeatherType} from '@Weather/features/weather/models/weather';
import WeatherScreen from '@Weather/screens/weathercreen';
console.log('WeatherScreen is:===', WeatherScreen);

jest.mock('@react-native-community/geolocation', () => ({
  getCurrentPosition: jest.fn((success, error, options) => {
    success({
      coords: {
        latitude: 52.52,
        longitude: 13.405,
        accuracy: 100,
      },
      timestamp: Date.now(),
    });
  }),
  watchPosition: jest.fn(),
  clearWatch: jest.fn(),
  stopObserving: jest.fn(),
}));

jest.mock('react-native-permissions', () => {
  return {
    check: jest.fn(() => Promise.resolve('granted')),
    request: jest.fn(() => Promise.resolve('granted')),
    openSettings: jest.fn(),
    PERMISSIONS: {
      IOS: {},
      ANDROID: {},
    },
    RESULTS: {
      GRANTED: 'granted',
      DENIED: 'denied',
      BLOCKED: 'blocked',
      UNAVAILABLE: 'unavailable',
    },
  };
});

const mockWeather: DayWeatherType = {
  name: 'Berlin',
  main: {
    temp: 20,
    feels_like: 18,
    temp_max: 22,
    temp_min: 15,
    humidity: 60,
  },
  wind: {
    speed: 5,
  },
  weather: [
    {
      description: 'clear sky',
      icon: '01d',
      main: '',
    },
  ],
  dt_txt: '2023-10-01 12:00:00',
};

describe('WeatherScreen', () => {
  beforeEach(() => {
    (useRoute as jest.Mock).mockReturnValue({
      params: {
        city: 'Berlin',
        dayWeather: mockWeather,
      },
    });
  });

  it('renders weather screen with provided dayWeather', () => {
    const {getByText} = render(
      <MockAppContainer>
        <WeatherScreen />
      </MockAppContainer>,
    );

    expect(getByText('Berlin')).toBeTruthy();
  });

  it('renders close button if dayWeather exists', () => {
    const {getByTestId} = render(
      <MockAppContainer>
        <WeatherScreen />
      </MockAppContainer>,
    );

    expect(getByTestId('WEATHER_GENERAL_VIEW')).toBeTruthy();
  });
});
