import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/components/HomeScreen';
import LocationDeniedError from './src/components/LocationDeniedError';
import PlaceDetails from './src/components/PlaceDetails';
import { RootStackParamList } from './src/types/route';
import PointMarker from './src/components/PointMarker';

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
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'}>
        {/* {error === 'location' ? (
          <Stack.Screen name="Error" component={LocationDeniedError} />
        ) : ( */}
        <>
          <Stack.Screen
            name="PlaceDetails"
            component={PlaceDetails}
            initialParams={{ placeData: testPlaceData }}
          />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="PointMarker" component={PointMarker} />
        </>
        {/* )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
