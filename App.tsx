import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { requestLocationPermission } from './src/modules/permissions';
import Geolocation, { GeoPosition } from 'react-native-geolocation-service';
import HomeScreen from './src/components/HomeScreen';
import LocationDeniedError from './src/components/LocationDeniedError';
import PlaceDetails from './src/components/PlaceDetails';
import { RootStackParamList } from './src/types/route';

const testPlaceData = {
  formattedAddress: 'Millennium Square, Leeds LS2 8BH, UK',
  name: 'Leeds City Museum',
  rating: 4.4,
  weekday_text: [
    'Monday: Closed',
    'Tuesday: 10:00 AM – 5:00 PM',
    'Wednesday: 10:00 AM – 5:00 PM',
    'Thursday: 10:00 AM – 5:00 PM',
    'Friday: 10:00 AM – 5:00 PM',
    'Saturday: 11:00 AM – 5:00 PM',
    'Sunday: 11:00 AM – 5:00 PM',
  ],
  website: 'https://citymuseum.leeds.gov.uk/',
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  const [userLocation, setUserLocation] = useState<GeoPosition | null>(null);
  const [error, setError] = useState<'location' | null>(null);

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
      setError('location');
    }
  }

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={error ? 'Error' : 'Home'}>
        {error === 'location' ? (
          <Stack.Screen name="Error" component={LocationDeniedError} />
        ) : (
          <>
            <Stack.Screen
              name="PlaceDetails"
              component={PlaceDetails}
              initialParams={{ placeData: testPlaceData }}
            />
            <Stack.Screen name="Home" component={HomeScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
