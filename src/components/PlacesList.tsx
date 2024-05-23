import React from 'react';
import { Text, View } from 'react-native';
import StyledButton from './StyledButton';
import { PlacesListProps } from '../types/route';
import PlaceCard from './PlaceCard';

export default function PlacesList({ navigation }: PlacesListProps) {
  const handleOnBackPress = () => {
    navigation.push('Home');
  };

  const places = ['one', 'two', 'three'];

  return (
    <View>
      <Text>Places List</Text>
      {places.map((place) => {
        return <PlaceCard>{place}</PlaceCard>;
      })}
      <StyledButton buttonText="Go Back" onPress={handleOnBackPress} />
    </View>
  );
}
