import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/components/HomeScreen';
import PlaceDetails from './src/components/PlaceDetails';
import PointMarker from './src/components/PointMarker';
import { Button } from 'react-native';

const Stack = createNativeStackNavigator();

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
            options={{
              headerRight: () => {
                <Button title="test" />;
              },
            }}
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
