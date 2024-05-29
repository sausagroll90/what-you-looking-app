import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/components/HomeScreen';
import PlaceDetails from './src/components/PlaceDetails';
import PlacesList from './src/components/PlacesList';
import MapPage from './src/components/MapPage';
import SimpleMenu from './src/components/SimpleMenu';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const [selectedFilterTypes, setSelectedFilterTypes] = useState<string[]>([]);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen
          name="PlaceDetails"
          component={PlaceDetails}
          options={{
            headerLeft: SimpleMenu,
            headerBackVisible: false,
            headerTitleAlign: 'center',
            title: 'Details',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 25,
              color: '#136f63',
            },
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
          initialParams={{ selectedFilterTypes, setSelectedFilterTypes }}
        />
        <Stack.Screen
          name="Favourites"
          component={PlacesList}
          options={{
            headerLeft: SimpleMenu,
            headerBackVisible: false,
            headerTitleAlign: 'center',
            title: 'Favourites',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 25,
              color: '#136f63',
            },
          }}
          initialParams={{ key: 'favourites' }}
        />
        <Stack.Screen
          name="History"
          component={PlacesList}
          initialParams={{ key: 'history' }}
          options={{
            headerLeft: SimpleMenu,
            headerBackVisible: false,
            headerTitleAlign: 'center',
            title: 'History',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 25,
              color: '#136f63',
            },
          }}
        />
        <Stack.Screen
          name="Map"
          component={MapPage}
          initialParams={{ selectedFilterTypes, setSelectedFilterTypes }}
          options={{
            headerShown: false,
            headerTitleAlign: 'center',
            title: 'Map View',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
