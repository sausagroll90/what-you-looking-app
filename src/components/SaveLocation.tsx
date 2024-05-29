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
import DisabledButton from './DisabledButton';

interface Location {
  latitude: number;
  longitude: number;
  date?: number;
}

export default function SaveLocation() {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [place, setPlace] = useState<string>('');
  const [savedPlaces, setSavedPlaces] = useState<SavedLocationData[]>();
  const [validSave, setValidSave] = useState(false);

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

  useEffect(() => {
    place !== '' ? setValidSave(true) : null;
  }, [place]);

  async function getSavedLocationData(key: string) {
    const allData = await getAllPlaces(key);
    allData ? setSavedPlaces(allData) : null;
  }

  function onPress() {
    savePlace();
  }

  async function savePlace() {
    const dateNow = new Date();
    const newUserLocation = {
      ...userLocation,
      name: place,
      date: dateNow,
    };
    await addLocationToStorage(newUserLocation, 'location');
    await getSavedLocationData('location');
  }

  return (
    <ScrollView>
      <Text style={styles.title}>Label</Text>
      <TextInput
        placeholder="I parked my car here...."
        style={styles.input}
        value={place}
        onChangeText={setPlace}
      />
      <View style={styles.button}>
        {validSave ? (
          <StyledButton buttonText="Save" onPress={onPress} />
        ) : (
          <DisabledButton buttonText="Add Label" />
        )}
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
