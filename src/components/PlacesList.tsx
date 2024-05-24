import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import PlaceCard from './PlaceCard';
import StyledButton from './StyledButton';
import { getAllPlaces, removePlaceData } from '../modules/localStorage';
import { PlaceThumbnailData } from '../types/route';

export default function PlacesList() {
  const [placesToDisplay, setPlacesToDisplay] = useState<
    PlaceThumbnailData[] | []
  >([]);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    setIsDeleted(false);
    setData();
  }, [isDeleted]);

  async function setData() {
    const allData = await getAllPlaces();
    allData ? setPlacesToDisplay(allData) : null;
  }

  const handleClear = () => {
    removePlaceData();
    setPlacesToDisplay([]);
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
