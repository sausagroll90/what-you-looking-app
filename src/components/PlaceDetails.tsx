import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Linking, Button } from 'react-native';
import { PlaceData, PlaceDetailsProps } from '../types/route';
import StyledButton from './StyledButton';
import { getPlaceDetails } from '../modules/apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PlaceDetails({
  route,
  navigation,
}: PlaceDetailsProps): React.JSX.Element {
  const [placeDetails, setPlaceDetails] = useState<PlaceData | null>(null);
  const [showButton, setShowButton] = useState(false);
  // const [itemForLocalStorage, setItemForLocalStorage] = useState(null);
  // const [currentLocalStorage, setCurrentLocalStorage] = useState();

  const place_id: string = route.params.place_id;
  // const place_id = 'ChIJLT2I8s5deUgR90SpTPQOKKo';

  // const showButton: boolean | undefined = route.params.showButton;

  // const storeData = async (value) => {
  //   try {
  //     const allData = await AsyncStorage.getItem('place');
  //     setCurrentLocalStorage([JSON.parse(allData)]);
  //     console.log('all data', currentLocalStorage);
  //     const jsonValue = JSON.stringify(value);
  //     allData ? currentLocalStorage.push(jsonValue) : null;
  //     setCurrentLocalStorage(currentLocalStorage);
  //     console.log('current local storage', currentLocalStorage);
  //     await AsyncStorage.setItem('place', currentLocalStorage);
  //   } catch (e) {
  //     console.log('error', e);
  //   }
  // };

  // const handleSave = () => {
  //   console.log('In handleSave');
  //   storeData(itemForLocalStorage);
  // };

  // const getData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('place');
  //     console.log('json value', JSON.parse(jsonValue));
  //     return jsonValue !== null ? JSON.parse(jsonValue) : null;
  //   } catch (e) {
  //     console.log('error', e);
  //   }
  // };

  // const handleGet = () => {
  //   getData();
  //   console.log('In get block');
  // };

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
      {/* <Button title="Save" onPress={handleSave} />
      <Button title="Get" onPress={handleGet} /> */}
    </View>
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
