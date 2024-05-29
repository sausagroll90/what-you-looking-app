import React, { useEffect, useState } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import StyledButton from './StyledButton';
import { getUserLocation } from '../modules/utils';
import {
  addLocationToStorage,
  getAllPlaces,
  removePlaceData,
} from '../modules/localStorage';
import { SavedLocationData } from '../types/route';
import LocationCard from './LocationCard';

interface Location {
  latitude: number;
  longitude: number;
  date?: number;
}

export default function SaveLocation() {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [place, setPlace] = useState<string>();
  const [savedPlaces, setSavedPlaces] = useState<SavedLocationData[]>();

  useEffect(() => {
    getUserLocation(
      (lat, long) => {
        setUserLocation({ latitude: lat, longitude: long });
      },
      (error) => {
        console.log(error, 'error in save location');
      },
      () => {
        console.log('location permission denied');
      },
    );
    getSavedLocationData('location');
  }, []);

  async function getSavedLocationData(key: string) {
    const allData = await getAllPlaces(key);
    allData ? setSavedPlaces(allData) : null;
  }

  function onPress() {
    savePlace();
  }

  async function savePlace() {
    const newUserLocation = {
      ...userLocation,
      name: place,
      date: new Date().toDateString(),
    };
    await addLocationToStorage(newUserLocation, 'location');
    await getSavedLocationData('location');
  }
  const date = new Date();
  const dateNow = new Date().toDateString();
  console.log(dateNow, 'date now');

  return (
    <ScrollView>
      <Text style={styles.title}>Label For Place to Save</Text>
      <TextInput
        placeholder="car parked.. / park meet up... / friends house...."
        style={styles.input}
        value={place}
        onChangeText={setPlace}
      />
      <View style={styles.button}>
        <StyledButton buttonText="Save" onPress={onPress} />
      </View>
      <Text style={styles.title}>Saved Places</Text>
      {savedPlaces
        ? savedPlaces.map((location) => {
            return <LocationCard key={location.date} location={location} />;
          })
        : null}
      <Button
        title="Delete All"
        onPress={() => {
          removePlaceData('location');
          setSavedPlaces([]);
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    margin: 10,
    padding: 10,
    borderColor: '#032b43',
    borderWidth: 2,
    borderRadius: 10,
  },
  title: {
    padding: 15,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#136f63',
    textAlignVertical: 'center',
  },
  button: {
    alignSelf: 'flex-start',
  },
});
