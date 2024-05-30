import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import StyledButton from './StyledButton';
import { useNavigation } from '@react-navigation/native';
import EmbeddedMap from './EmbeddedMap';
import { formatDate } from '../modules/utils';
import { LocationCardNavigationProp, PlaceThumbnailData } from '../types/route';
import { getAllPlaces, setPlaces } from '../modules/localStorage';

type LocationCardProps = {
  location: {
    latitude: number;
    longitude: number;
    date: string;
    name: string;
    place_id: string;
  };
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LocationCard(
  props: LocationCardProps,
): React.JSX.Element {
  const { name, date, latitude, longitude, place_id } = props.location;
  const { setIsDeleted } = props;
  const navigation = useNavigation<LocationCardNavigationProp>();
  const locationToShow = { latitude: latitude, longitude: longitude };
  const [deleteButtonText, setDeleteButtonText] = useState('Remove');

  function handlePress() {
    navigation.push('SavedLocationAR', { location: locationToShow });
  }

  const handleDelete = async () => {
    try {
      const allData = await getAllPlaces('location');
      if (allData) {
        setDeleteButtonText('Removing...');
        console.log(allData);

        const locationIdArray = allData.map(
          (place: PlaceThumbnailData) => place.place_id,
        );

        const indexPositionToDelete = locationIdArray.indexOf(place_id);
        allData.splice(indexPositionToDelete, 1);
        await setPlaces(allData, 'location');
        setDeleteButtonText('Removed');
        setIsDeleted(true);
      } else {
        null;
      }
    } catch (e) {
      console.log('error removing item from list', e);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={[styles.card, styles.elevation]}>
          <View style={styles.text_area}>
            <Text style={styles.place_name}>{name}</Text>
            <Text style={styles.address}>Saved {formatDate(date)}</Text>
            <EmbeddedMap placeDetails={[locationToShow]} />
          </View>
          <View style={styles.button_container}>
            <StyledButton buttonText="View AR" onPress={handlePress} />
          </View>
          <View style={styles.button_container}>
            <StyledButton
              buttonText={deleteButtonText}
              onPress={handleDelete}
            />
          </View>
        </View>
      </View>
    </ScrollView>
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
