import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Linking, Button } from 'react-native';
import { Props } from '../types/route';
import StyledButton from './StyledButton';
import { getPlaceDetails } from '../modules/apis';

export default function PlaceDetails({
  route,
  navigation,
}: Props): React.JSX.Element {
  const [placeDetails, setPlaceDetails] = useState({});

  const place_id: string = route.params.place_id;

  async function onPlaceIdReceived(place_id) {
    try {
      const data = await getPlaceDetails(place_id);
      console.log(data);
      setPlaceDetails(data);
    } catch (_) {
      console.log('In catch block');
    }
  }

  useEffect(() => {
    onPlaceIdReceived(place_id);
  });

  const handlePress = () => {
    Linking.openURL(placeDetails.website);
  };

  const handleOnBackPress = () => {
    navigation.push('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{placeDetails.name}</Text>
      <Text style={styles.data}>{placeDetails.formattedAddress}</Text>
      <Text style={styles.data}>Opening Hours:</Text>
      {placeDetails.current_opening_hours &&
        placeDetails.current_opening_hours.map((day) => {
          return (
            <Text key={day} style={styles.openingData}>
              {day}
            </Text>
          );
        })}
      {placeDetails.rating && (
        <Text style={styles.data}>{placeDetails.rating} rating</Text>
      )}
      {placeDetails.website && (
        <StyledButton buttonText="Website" onPress={handlePress} />
      )}
      <Button title="Go Back" onPress={handleOnBackPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    color: '#136f63',
    fontSize: 32,
  },
  data: {
    color: '#032b43',
    fontSize: 16,
    padding: 15,
  },
  openingData: {
    color: '#032b43',
    fontSize: 16,
  },
  button: {
    padding: 23,
  },
});
