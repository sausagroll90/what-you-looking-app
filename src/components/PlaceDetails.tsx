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
import { PlaceData, PlaceDetailsProps } from '../types/route';
import StyledButton from './StyledButton';
import { getPlaceDetails } from '../modules/apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PlaceDetails({
  route,
  navigation,
}: PlaceDetailsProps): React.JSX.Element {
  const [placeDetails, setPlaceDetails] = useState<PlaceData | null>(null);
  const [showButton, setShowButton] = useState<boolean | null>(false);
  const [itemForLocalStorage, setItemForLocalStorage] =
    useState<PlaceThumbnailData | null>(null);

  const place_id: string = route.params.place_id;

  interface PlaceThumbnailData {
    name: string;
    address: string;
    place_id: string;
  }

  const storeData = async (place: PlaceThumbnailData) => {
    try {
      const allData = await AsyncStorage.getItem('place');
      if (allData === null) {
        const jsonPlace = JSON.stringify([place]);
        await AsyncStorage.setItem('place', jsonPlace);
      } else {
        const parsedPlaces = JSON.parse(allData);
        parsedPlaces.push(place);
        await AsyncStorage.setItem('place', JSON.stringify(parsedPlaces));
      }
    } catch (e) {
      //what to show the user if there is no data returned
      console.log('error', e);
    }
  };

  const handleSave = () => {
    itemForLocalStorage ? storeData(itemForLocalStorage) : null;
  };

  async function onPlaceIdReceived(placeId: string) {
    try {
      const data = await getPlaceDetails(placeId);
      setPlaceDetails(data);
      setItemForLocalStorage({
        name: data.name,
        address: data.formatted_address,
        place_id: data.place_id,
      });
    } catch (e) {
      console.log(e);
      console.log('Error fetching place details');
    }
  }

  useEffect(() => {
    onPlaceIdReceived(place_id);
    route.params?.showButton ? setShowButton(true) : setShowButton(false);
  }, [place_id, route.params?.showButton]);

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
          <Button title="Save" onPress={handleSave} />
          <Button
            title="Place list"
            onPress={() => {
              navigation.push('PlacesList');
            }}
          />
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
