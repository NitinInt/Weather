import Geolocation from '@react-native-community/geolocation';
import {useCallback, useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {AppState, Platform} from 'react-native';
import {
  check,
  PERMISSIONS,
  PermissionStatus,
  request,
} from 'react-native-permissions';

export type LocationType = {lat: number; lon: number};
export const DEFAULT_LOCATION: LocationType = {lat: 51.0303, lon: 6.98432};
/*

'unavailable'	This feature is not available (on this device / in this context)
'denied'	The permission has not been requested / is denied but requestable
'granted'	The permission is granted
'limited	The permission is granted but with limitations
'blocked'	The permission is denied and not requestable anymore, android never  return blocked check so use request for the same

*/

const useDeviceLocation = () => {
  const intl = useIntl();
  const [deviceCurrentLocation, setDeviceCurrentLocation] =
    useState<LocationType>(DEFAULT_LOCATION);
  const [currentLocationPermissionStatus, setCurrentLocationPermissionStatus] =
    useState<PermissionStatus | undefined>();

  const checkAndroidPermissions = async () => {
    try {
      const permission = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      return permission;
    } catch {
      //TODO: track error
      return undefined;
    }
  };

  const checkIOSPermissions = async () => {
    try {
      const permission = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      return permission;
    } catch {
      //TODO: track error
      return undefined;
    }
  };

  const checkLocationPermissions = useCallback(async () => {
    if (Platform.OS === 'android') {
      const status = await checkAndroidPermissions();
      setCurrentLocationPermissionStatus(status);
      return status;
    }
    const status = await checkIOSPermissions();
    setCurrentLocationPermissionStatus(status);
    return status;
  }, []);

  const requestIOSLocationPermissions = async () => {
    try {
      const status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      return status;
    } catch {
      //TODO: track error
      return undefined;
    }
  };
  const requestAndroidLocationPermissions = useCallback(async () => {
    try {
      const status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, {
        title: intl.formatMessage({id: 'locationPermissions.title'}),
        message: intl.formatMessage({id: 'locationPermissions.message'}),
        buttonPositive: intl.formatMessage({id: 'locationPermissions.button'}),
      });
      return status;
    } catch {
      //TODO: track error
      return undefined;
    }
  }, [intl]);

  const requestLocationPermissions = useCallback(async () => {
    if (Platform.OS === 'android') {
      const status = await requestAndroidLocationPermissions();
      setCurrentLocationPermissionStatus(status);
      return status;
    }
    const status = await requestIOSLocationPermissions();
    setCurrentLocationPermissionStatus(status);
    return status;
  }, [requestAndroidLocationPermissions]);

  const updateCurrentLocation = useCallback(async () => {
    const currentStatus = await checkLocationPermissions();
    if (currentStatus === 'granted' || currentStatus === 'limited') {
      Geolocation.getCurrentPosition(
        position => {
          setDeviceCurrentLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        _error => {
          //TODO: track location error
          setDeviceCurrentLocation(DEFAULT_LOCATION);
        },
        {enableHighAccuracy: false, timeout: 20000, maximumAge: 100000},
      );
    }

    return undefined;
  }, [checkLocationPermissions]);

  const checkAndRequestLocationPermissions = useCallback(async () => {
    const permission = await checkLocationPermissions();
    if (permission === 'unavailable' || permission === 'denied') {
      const status = await requestLocationPermissions();
      setCurrentLocationPermissionStatus(permission);
      return status;
    }
    setCurrentLocationPermissionStatus(permission);
    return permission;
  }, [checkLocationPermissions, requestLocationPermissions]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        void updateCurrentLocation();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [updateCurrentLocation]);

  useEffect(() => {
    const checkAndUpdateLocation = async () => {
      const permission = await checkLocationPermissions();
      if (permission === 'granted' || permission === 'limited') {
        void updateCurrentLocation();
      }
    };
    void checkAndUpdateLocation();
  }, [
    checkLocationPermissions,
    currentLocationPermissionStatus,
    updateCurrentLocation,
  ]);

  return {
    currentLocationPermissionStatus,
    checkLocationPermissions,
    requestLocationPermissions,
    checkAndRequestLocationPermissions,
    deviceCurrentLocation,
    updateCurrentLocation,
  };
};

export default useDeviceLocation;
