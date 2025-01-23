// App.tsx
import React from 'react';
import { PermissionProvider } from './src/context/PermissonsContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/navigation/types';
import HomeScreen from './src/screens/HomeScreen';
import NearbyWifiScreen from './src/screens/NearbyWifiScreen';
import AreasScreen from './src/screens/AreasScreen';
import AreaDetailsScreen from './src/screens/AreaDetailsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <PermissionProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="NearbyWifi" component={NearbyWifiScreen} />
          <Stack.Screen name="Areas" component={AreasScreen} />
          <Stack.Screen name="AreaDetails" component={AreaDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PermissionProvider>
  );
}
