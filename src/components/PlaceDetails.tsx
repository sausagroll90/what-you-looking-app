import React from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';
import { Props } from '../types/route';
import StyledButton from './StyledButton';

export default function PlaceDetails({ route }: Props): React.JSX.Element {
  const { formattedAddress, name, rating, weekday_text, website, place_id } =
    route.params.placeData;

  const handlePress = () => {
    Linking.openURL(website);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.data}>{formattedAddress}</Text>
      <Text style={styles.data}>Opening Hours:</Text>
      {weekday_text &&
        weekday_text.map((day) => {
          return (
            <Text key={day} style={styles.openingData}>
              {day}
            </Text>
          );
        })}
      {rating && <Text style={styles.data}>{rating} rating</Text>}
      {website && <StyledButton buttonText="Website" onPress={handlePress} />}
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
