import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import PlaceCard from './PlaceCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StyledButton from './StyledButton';

export default function PlacesList() {
  const [placesToDisplay, setPlacesToDisplay] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const allData = await AsyncStorage.getItem('place');
      allData ? setPlacesToDisplay(JSON.parse(allData)) : null;
    } catch (e) {
      //what to do if nothing is returned
      console.log('error', e);
    }
  }

  const handleClear = () => {
    removePlaceData();
    setPlacesToDisplay([]);
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
    <ScrollView>
      <View style={styles.places_list}>
        {placesToDisplay.map((place) => {
          return <PlaceCard key={place.place_id} placeDetails={place} />;
        })}
      </View>
      <StyledButton buttonText="Remove all" onPress={handleClear} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  places_list: {
    marginTop: 20,
    marginBottom: 10,
  },
});
