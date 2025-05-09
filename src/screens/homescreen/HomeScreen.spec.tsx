import {render} from '@testing-library/react-native';
import React from 'react';

import {MockAppContainer} from '@Weather/__specs__/mocks/MockAppContainer';
import {TEST_IDS} from '@Weather/__specs__/testIDs';

import HomeScreen from '.';
import useHomeScreen from './useHomeScreen';

jest.mock('./useHomeScreen');

const mockUseHomeScreen = useHomeScreen as jest.Mock;

describe('HomeScreen', () => {
  it('renders loading skeleton when loading', () => {
    mockUseHomeScreen.mockReturnValue({
      onSearchPress: jest.fn(),
      isError: false,
      isLoading: true,
      weather: null,
      forecasts: null,
    });

    const {getByTestId} = render(
      <MockAppContainer>
        <HomeScreen />
      </MockAppContainer>,
    );

    expect(getByTestId(TEST_IDS.WEATHER_SKELETON_VIEW)).toBeTruthy();
  });

  it('renders weather and forecast when data is available', () => {
    mockUseHomeScreen.mockReturnValue({
      onSearchPress: jest.fn(),
      isError: false,
      isLoading: false,
      weather: {condition: 'Clear', temp: 22}, // mock shape, adjust to your real model
      forecasts: [{day: 'Mon', high: 24, low: 18}],
    });

    const {getByTestId} = render(
      <MockAppContainer>
        <HomeScreen />
      </MockAppContainer>,
    );

    expect(getByTestId(TEST_IDS.WEATHER_GENERAL_VIEW)).toBeTruthy();
    expect(getByTestId(TEST_IDS.FORECAST_DISPLAY)).toBeTruthy();
  });
});
