import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

type EmbeddedMapProps = {
  placeDetails: {
    latitude: number;
    longitude: number;
    name?: string;
    type?: string;
  };
};

export default function EmbeddedMap(props: EmbeddedMapProps) {
  let iconImage: HTMLImageElement = require('../../res/icons/building.png');
  switch (props.placeDetails.type) {
    case 'art_gallery':
      iconImage = require('../../res/icons/art-gallery.png');
      break;
    case 'bar':
      iconImage = require('../../res/icons/bar.png');
      break;
    case 'cafe':
      iconImage = require('../../res/icons/cafe.png');
      break;
    case 'city_hall':
      iconImage = require('../../res/icons/city-hall.png');
      break;
    case 'museum':
      iconImage = require('../../res/icons/museum.png');
      break;
    case 'restaurant':
      iconImage = require('../../res/icons/restaurant.png');
      break;
    case 'tourist_attraction':
      iconImage = require('../../res/icons/tourist_attraction.png');
      break;
  }

  return (
    <View style={styles.mapStyle}>
      <MapView
        style={styles.mapViewStyle}
        initialRegion={{
          latitude: props.placeDetails.latitude,
          longitude: props.placeDetails.longitude,
          latitudeDelta: 0.0002,
          longitudeDelta: 0.002,
        }}>
        <Marker
          coordinate={{
            latitude: props.placeDetails.latitude,
            longitude: props.placeDetails.longitude,
          }}
          title={props.placeDetails.name || 'here'}>
          <Text>{props.placeDetails.name || 'here'}</Text>
          <Image
            source={iconImage}
            style={styles.markerImage}
            resizeMode="contain"
          />
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    flex: 1,
    alignSelf: 'stretch',
  },
  mapViewStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  markerImage: {
    width: 35,
    height: 35,
  },
});
