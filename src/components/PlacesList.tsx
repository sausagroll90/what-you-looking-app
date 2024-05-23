import React from 'react';
import { View } from 'react-native';
import PlaceCard from './PlaceCard';

export default function PlacesList() {
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
      {localStorageData.map((place) => {
        return <PlaceCard key={place.place_id} placeDetails={place} />;
      })}
    </View>
  );
}
