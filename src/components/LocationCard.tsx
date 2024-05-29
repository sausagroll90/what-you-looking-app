import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import StyledButton from './StyledButton';
import { useNavigation } from '@react-navigation/native';
import EmbeddedMap from './EmbeddedMap';

export default function LocationCard(props) {
  const { name, date, latitude, longitude } = props.location;
  const navigation = useNavigation();
  const locationToShow = { latitude: latitude, longitude: longitude };
  function handlePress() {
    navigation.push('SavedLocationAR', { location: locationToShow });
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={[styles.card, styles.elevation]}>
          <View style={styles.text_area}>
            <Text style={styles.place_name}>{name}</Text>
            <Text style={styles.address}>Saved {date}</Text>
            <EmbeddedMap placeDetails={[locationToShow]} />
          </View>
          <View style={styles.button_container}>
            <StyledButton buttonText="View AR" onPress={handlePress} />
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
