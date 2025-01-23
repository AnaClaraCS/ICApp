import React, { createContext, useContext, useEffect, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

type PermissionContextType = {
  hasLocationPermission: boolean;
  requestLocationPermission: () => Promise<boolean>;
};

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

export const usePermissionContext = () => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error('usePermissionContext must be used within a PermissionProvider');
  }
  return context;
};

interface PermissionProviderProps {
  children: React.ReactNode;
}

export const PermissionProvider: React.FC<PermissionProviderProps> = ({ children }) => {
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  const checkLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const status = await check(PERMISSIONS.IOS.LOCATION_ALWAYS);
      setHasLocationPermission(status === RESULTS.GRANTED);
    } else {
      const status = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      setHasLocationPermission(status === RESULTS.GRANTED);
    }
  };

  const requestLocationPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'ios') {
      const status = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
      const granted = status === RESULTS.GRANTED;
      setHasLocationPermission(granted);
      return granted;
    } else {
      const status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      const granted = status === RESULTS.GRANTED;
      setHasLocationPermission(granted);
      return granted;
    }
  };

  useEffect(() => {
    checkLocationPermission();
  }, []);

  return (
    <PermissionContext.Provider value={{ hasLocationPermission, requestLocationPermission }}>
      {children}
    </PermissionContext.Provider>
  );
};
