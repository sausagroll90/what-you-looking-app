import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

type EmbeddedMapProps = {
  userLocation: {
    latitude: number;
    longitude: number;
  };
  pointsOfInterest: {
    latitude: number;
    longitude: number;
    name: string;
    place_id: string;
    types: string[];
  }[];
};

export default function EmbeddedMap(props: EmbeddedMapProps) {
  return (
    <MapView
      style={styles.mapStyle}
      initialRegion={{
        latitude: props.userLocation.latitude,
        longitude: props.userLocation.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.04,
      }}
    />
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
