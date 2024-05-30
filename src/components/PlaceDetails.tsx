import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Linking,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  PlaceData,
  PlaceDetailsProps,
  PlaceThumbnailData,
} from '../types/route';
import StyledButton from './StyledButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getPlaceDetails } from '../modules/apis';
import {
  addPlaceToStorage,
  getAllPlaces,
  setPlaces,
} from '../modules/localStorage';
import { OnSave } from './OnSave';
import { isPlaceIdUnique } from '../modules/utils';
import EmbeddedMap from './EmbeddedMap';
import { useIsFocused } from '@react-navigation/native';
import LoadingSpinner from './LoadingSpinner';

export default function PlaceDetails({
  route,
  navigation,
}: PlaceDetailsProps): React.JSX.Element {
  const [placeDetails, setPlaceDetails] = useState<PlaceData | null>(null);
  const [itemForLocalStorage, setItemForLocalStorage] =
    useState<PlaceThumbnailData | null>(null);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState<boolean>(false);
  const [saveSuccessful, setSaveSuccessful] = useState(false);
  const isFocused = useIsFocused();

  const place_id: string = route.params.place_id;

  let showButton = false;

  route.params?.showButton ? (showButton = route.params.showButton) : false;

  const handleSave = () => {
    itemForLocalStorage
      ? addPlaceToStorage(itemForLocalStorage, 'favourites')
      : null;
    setSaveSuccessful(true);
  };

  const handleDelete = async () => {
    try {
      const allData = await getAllPlaces('favourites');
      if (allData) {
        const placeIdArray = allData.map(
          (place: PlaceThumbnailData) => place.place_id,
        );
        const indexPositionToDelete = placeIdArray.indexOf(place_id);
        allData.splice(indexPositionToDelete, 1);
        await setPlaces(allData, 'favourites');
        setSaveButtonDisabled(false);
      } else {
        null;
      }
    } catch (e) {
      console.log('error removing item from list', e);
    }
  };

  async function onPlaceIdReceived(placeId: string) {
    try {
      const place = await getPlaceDetails(placeId);
      const placeToStore = {
        name: place.name,
        address: place.formatted_address,
        place_id: place.place_id,
      };
      setPlaceDetails(place);
      setItemForLocalStorage(placeToStore);
      addPlaceToStorage(placeToStore, 'history');
      const allData = await getAllPlaces('favourites');
      setSaveButtonDisabled(!isPlaceIdUnique(allData, placeToStore));
    } catch (e) {
      console.log(e);
      console.log('Error fetching place details');
    }
  }

  useEffect(() => {
    onPlaceIdReceived(place_id);
  }, [place_id, saveSuccessful, isFocused]);

  const handlePress = () => {
    if (placeDetails && placeDetails.website) {
      Linking.openURL(placeDetails.website);
    }
  };

  const handleOnBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {placeDetails ? (
            <>
              <View style={styles.save}>
                <Text style={styles.name}>{placeDetails.name}</Text>
                {saveButtonDisabled ? (
                  <TouchableOpacity onPress={handleDelete}>
                    <Icon name="heart" size={30} color={'#D90202'} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={handleSave}>
                    <Icon name="heart-o" size={30} color={'#D90202'} />
                  </TouchableOpacity>
                )}
              </View>
              {placeDetails.rating && (
                <Text style={styles.rating}>{placeDetails.rating} rating</Text>
              )}
              {placeDetails.overview && (
                <Text style={styles.data}>{placeDetails.overview}</Text>
              )}
              <Text style={styles.data}>{placeDetails.formatted_address}</Text>
              <View style={styles.openingHours}>
                {placeDetails.current_opening_hours && (
                  <Text style={styles.bold}>Opening Hours:</Text>
                )}
                {placeDetails.current_opening_hours &&
                  placeDetails.current_opening_hours.map((day) => {
                    return (
                      <Text key={day} style={styles.openingData}>
                        {day}
                      </Text>
                    );
                  })}
              </View>
              {placeDetails.website && (
                <StyledButton buttonText="Website" onPress={handlePress} />
              )}
            </>
          ) : (
            <LoadingSpinner />
          )}
          {showButton ? (
            <StyledButton buttonText="Back" onPress={handleOnBackPress} />
          ) : null}

          {saveSuccessful ? <OnSave text={'Added to favourites!'} /> : null}
          {placeDetails ? <EmbeddedMap placeDetails={[placeDetails]} /> : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'flex-start',
  },
  name: {
    fontWeight: 'bold',
    color: '#136f63',
    fontSize: 32,
    padding: 10,
    width: '80%',
  },
  data: {
    color: '#032b43',
    fontSize: 16,
    padding: 10,
  },
  openingData: {
    color: '#032b43',
    fontSize: 16,
    paddingLeft: 10,
    lineHeight: 25,
  },
  openingHours: {
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
    color: '#032b43',
    fontSize: 16,
    padding: 10,
  },
  rating: {
    fontWeight: 'bold',
    color: '#032b43',
    fontSize: 16,
    alignSelf: 'center',
  },
  save: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
