import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { requestLocationPermission } from './src/modules/permissions';
import Geolocation, { GeoPosition } from 'react-native-geolocation-service';
import HomeScreen from './src/components/HomeScreen';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const [userLocation, setUserLocation] = useState<GeoPosition | null>(null);

  async function getUserLocation(): Promise<void> {
    const isGranted = await requestLocationPermission();
    if (isGranted) {
      Geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(position);
        },
        (err) => {
          console.log(err.code, err.message);
          setUserLocation(null);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    } else {
      console.log('Location permission is not granted');
    }
  }

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
