import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import PlaceCard from './PlaceCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StyledButton from './StyledButton';

export default function PlacesList({ route }) {
  const [placesToDisplay, setPlacesToDisplay] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    setIsDeleted(false);
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleted]);

  async function getData() {
    try {
      const allData = await AsyncStorage.getItem(route.params.key);
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
      await AsyncStorage.removeItem(route.params.key);
    } catch (e) {
      console.log('error in clear', e);
    }
    console.log('All Cleared');
  };

  return (
    <ScrollView>
      <View style={styles.places_list}>
        {placesToDisplay.map((place) => {
          return (
            <PlaceCard
              key={place.place_id}
              placeDetails={place}
              isDeleted={isDeleted}
              setIsDeleted={setIsDeleted}
            />
          );
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
