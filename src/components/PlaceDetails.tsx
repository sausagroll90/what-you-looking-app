import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Linking,
  Button,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {
  PlaceData,
  PlaceDetailsProps,
  PlaceThumbnailData,
} from '../types/route';
import StyledButton from './StyledButton';

import { getPlaceDetails } from '../modules/apis';
import { addPlaceToStorage, getAllItems } from '../modules/localStorage';
import { OnSave } from './OnSave';
import { isPlaceIdUnique } from '../modules/utils';
import EmbeddedMap from './EmbeddedMap';
import DisabledButton from './DisabledButton';

export default function PlaceDetails({
  route,
  navigation,
}: PlaceDetailsProps): React.JSX.Element {
  const [placeDetails, setPlaceDetails] = useState<PlaceData | null>(null);
  const [itemForLocalStorage, setItemForLocalStorage] =
    useState<PlaceThumbnailData | null>(null);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState<boolean>(false);
  const [saveSuccessful, setSaveSuccessful] = useState(false);

  const place_id: string = route.params.place_id;

  let showButton = false;

  route.params?.showButton ? (showButton = route.params.showButton) : false;

  const handleSave = () => {
    itemForLocalStorage
      ? addPlaceToStorage(itemForLocalStorage, 'favourites')
      : null;
    setSaveSuccessful(true);
  };

  async function onPlaceIdReceived(placeId: string) {
    try {
      const data = await getPlaceDetails(placeId);
      const placeToStore = {
        name: data.name,
        address: data.formatted_address,
        place_id: data.place_id,
      };
      setPlaceDetails(data);
      setItemForLocalStorage(placeToStore);
      addPlaceToStorage(placeToStore, 'history');
      const allData = await getAllItems('favourites');
      console.log(allData, 'is data');

      setSaveButtonDisabled(!isPlaceIdUnique(allData, data));
    } catch (e) {
      console.log(e);
      console.log('Error fetching place details');
    }
  }

  useEffect(() => {
    onPlaceIdReceived(place_id);
  }, [place_id, saveSuccessful]);

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
              <Text style={styles.name}>{placeDetails.name}</Text>
              {placeDetails.rating && (
                <Text style={styles.rating}>{placeDetails.rating} rating</Text>
              )}
              {placeDetails.overview && (
                <Text style={styles.data}>{placeDetails.overview}</Text>
              )}
              <Text style={styles.data}>{placeDetails.formatted_address}</Text>
              <View style={styles.openingHours}>
                <Text style={styles.bold}>Opening Hours:</Text>
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
          ) : null}
          {showButton ? (
            <StyledButton buttonText="Back" onPress={handleOnBackPress} />
          ) : null}
          {saveButtonDisabled ? (
            <DisabledButton buttonText={'Saved'} />
          ) : (
            <StyledButton buttonText={'Save'} onPress={handleSave} />
          )}
          <Button
            title="Favourites"
            onPress={() => {
              navigation.push('Favourites');
            }}
          />
          {saveSuccessful ? <OnSave /> : null}
          {placeDetails ? <EmbeddedMap placeDetails={placeDetails} /> : null}
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
});
