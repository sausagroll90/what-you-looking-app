import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StyledButton from './StyledButton';
import { useNavigation } from '@react-navigation/native';
import { PlaceCardNavigationProp, PlaceThumbnailData } from '../types/route';
import { getAllPlaces, setPlaces } from '../modules/localStorage';

type PlaceDetailProps = {
  placeDetails: PlaceThumbnailData;
  isDeleted: boolean;
  setIsDeleted: (open: boolean) => void;
};

export default function PlaceCard(props: PlaceDetailProps) {
  const {
    placeDetails: { name, address, place_id },
  } = props;
  const { setIsDeleted } = props;
  const [deleteButtonText, setDeleteButtonText] = useState('Remove');

  const navigation = useNavigation<PlaceCardNavigationProp>();

  const handlePress = () => {
    navigation.push('PlaceDetails', { place_id: place_id, showButton: true });
  };

  const removeListItem = async () => {
    try {
      setDeleteButtonText('Removing...');
      const allData = await getAllPlaces();
      if (allData) {
        const placeIdArray = allData.map(
          (place: PlaceThumbnailData) => place.place_id,
        );
        const indexPositionToDelete = placeIdArray.indexOf(place_id.toString());
        allData.splice(indexPositionToDelete, 1);
        await setPlaces(allData);
        setDeleteButtonText('Removed');
        setIsDeleted(true);
      } else {
        null;
      }
    } catch (e) {
      console.log('error removing item from list', e);
    }
  };

  const handleDelete = () => {
    removeListItem();
  };

  return (
    <View style={styles.container}>
      <View style={[styles.card, styles.elevation]}>
        <View style={styles.text_area}>
          <Text style={styles.place_name}>{name}</Text>
          <Text style={styles.address}>{address}</Text>
        </View>
        <View style={styles.button_container}>
          <StyledButton buttonText="View" onPress={handlePress} />
          <StyledButton buttonText={deleteButtonText} onPress={handleDelete} />
        </View>
      </View>
    </View>
  );
}

const width_proportion = '90%';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'left',
  },
  button_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  card: {
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    alignSelf: 'center',
    width: width_proportion,
    backgroundColor: 'white',
  },
  text_area: {
    marginBottom: 10,
  },
  place_name: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#136f63',
  },
  address: {
    fontSize: 16,
  },
  elevation: {
    elevation: 5,
    shadowColor: 'black',
  },
});
