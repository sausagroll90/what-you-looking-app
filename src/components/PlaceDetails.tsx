import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';
import { PlaceData, PlaceDetailsProps } from '../types/route';
import StyledButton from './StyledButton';
import { getPlaceDetails } from '../modules/apis';

export default function PlaceDetails({
  route,
  navigation,
}: PlaceDetailsProps): React.JSX.Element {
  const [placeDetails, setPlaceDetails] = useState<PlaceData | null>(null);

  const place_id: string = route.params.place_id;
  const showButton: boolean = route.params.showButton;

  async function onPlaceIdReceived(placeId: string) {
    try {
      const data = await getPlaceDetails(placeId);
      setPlaceDetails(data);
    } catch (e) {
      console.log(e);
      console.log('Error fetching place details');
    }
  }

  useEffect(() => {
    onPlaceIdReceived(place_id);
  }, [place_id]);

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
