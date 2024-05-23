import React, { useState } from 'react';
import { Button, View } from 'react-native';
import PlaceCard from './PlaceCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PlacesList() {
  const [placesToDisplay, setPlacesToDisplay] = useState();
  const localStorageData = [
    {
      name: 'one',
      address: 'address one',
      place_id: 'ChIJwdWI4RxceUgRFF7zMoxhXQE',
    },
    {
      name: 'two',
      address: 'address two',
      place_id: 'ChIJXxlmWhxceUgRLjRj9eEbjWg',
    },
    {
      name: 'three',
      address: 'address three',
      place_id: 'ChIJ5wvuZn1deUgR7FJBFMRD5Ik',
    },
  ];

  const handleGet = () => {
    console.log('I am in get');
    getData();
  };

  const getData = async () => {
    try {
      const allData = await AsyncStorage.getItem('place');
      allData ? setPlacesToDisplay(JSON.parse(allData)) : null;
    } catch (e) {
      //what to do if nothing is returned
      console.log('error', e);
    }
  };

  const handleClear = () => {
    removePlaceData();
  };

  const removePlaceData = async () => {
    try {
      await AsyncStorage.removeItem('place');
    } catch (e) {
      console.log('error in clear', e);
    }
    console.log('All Cleared');
  };

  return (
    <>
      <View>
        {localStorageData.map((place) => {
          return <PlaceCard key={place.place_id} placeDetails={place} />;
        })}
      </View>
      <Button title="get data" onPress={handleGet} />
      <Button title="Clear data" onPress={handleClear} />
    </>
  );
}
