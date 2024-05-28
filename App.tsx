import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/components/HomeScreen';
import PlaceDetails from './src/components/PlaceDetails';
import PlacesList from './src/components/PlacesList';
import HomeButton from './src/components/HomeButton';
import MapPage from './src/components/MapPage';
import { RootStackParamList } from './src/types/route';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  const [selectedFilterTypes, setSelectedFilterTypes] = useState<string[]>([]);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen
          name="PlaceDetails"
          component={PlaceDetails}
          options={{
            headerRight: HomeButton,
            headerBackVisible: false,
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
            headerRight: HomeButton,
            headerBackVisible: false,
            title: 'Favourites',
          }}
          initialParams={{ key: 'favourites' }}
        />
        <Stack.Screen
          name="History"
          component={PlacesList}
          initialParams={{ key: 'history' }}
          options={{
            headerRight: HomeButton,
            headerBackVisible: false,
            title: 'History',
          }}
        />
        <Stack.Screen
          name="Map"
          component={MapPage}
          initialParams={{ selectedFilterTypes, setSelectedFilterTypes }}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
