import React from 'react';
import { Text, View } from 'react-native';
import StyledButton from './StyledButton';
import { PlacesListProps } from '../types/route';
import PlaceCard from './PlaceCard';

export default function PlacesList({ navigation }: PlacesListProps) {
  const handleOnBackPress = () => {
    navigation.push('Home');
  };

  const localStorageData = [
    {
      name: 'one',
      address: 'address one',
      place_id: 'ChIJwdWI4RxceUgRFF7zMoxhXQE',
    },
    { name: 'two', address: 'address two', place_id: 'id2' },
    { name: 'three', address: 'address three', place_id: 'id3' },
  ];

  return (
    <View>
      <Text>Places List</Text>
      {localStorageData.map((place) => {
        return <PlaceCard key={place.place_id} placeDetails={place} />;
      })}
      <StyledButton buttonText="Go Back" onPress={handleOnBackPress} />
    </View>
  );
}
