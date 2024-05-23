import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/components/HomeScreen';
import PlaceDetails from './src/components/PlaceDetails';
import PlacesList from './src/components/PlacesList';
import HomeButton from './src/components/HomeButton';
import Menu from './src/components/Menu';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Menu />
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
        />
        <Stack.Screen
          name="PlacesList"
          component={PlacesList}
          options={{
            headerRight: HomeButton,
            headerBackVisible: false,
            title: 'Places',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
