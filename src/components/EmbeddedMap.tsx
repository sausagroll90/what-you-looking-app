import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  PermissionsAndroid,
  Image,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const buildingImage = require('../../res/icons/building.png');

type EmbeddedMapProps = {
  placeLocation: {
    latitude: number;
    longitude: number;
    name?: string;
  };
  //   pointsOfInterest: {
  //     latitude: number;
  //     longitude: number;
  //     name: string;
  //     place_id: string;
  //     types: string[];
  //   }[];
};

export default function EmbeddedMap(props: EmbeddedMapProps) {
  return (
    <View style={styles.mapStyle}>
      <MapView
        style={styles.mapViewStyle}
        initialRegion={{
          latitude: props.placeLocation.latitude,
          longitude: props.placeLocation.longitude,
          latitudeDelta: 0.0002,
          longitudeDelta: 0.002,
        }}>
        <Marker
          coordinate={{
            latitude: props.placeLocation.latitude,
            longitude: props.placeLocation.longitude,
          }}
          title={props.placeLocation.name || 'here'}>
          <Text>{props.placeLocation.name || 'here'}</Text>
          <Image
            source={require('../../res/icons/building.png')}
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
