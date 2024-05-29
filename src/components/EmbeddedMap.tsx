import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MapView, { MapMarker } from 'react-native-maps';
import { getUserLocation } from '../modules/utils';

type location = {
  latitude: number;
  longitude: number;
  name?: string;
  type?: string;
};

type EmbeddedMapProps = {
  placeDetails: location[];
};

export default function EmbeddedMap(props: EmbeddedMapProps) {
  const [userLocation, setUserLocation] = useState<location | null>(null);

  useEffect(() => {
    getUserLocation(
      (lat, long) => {
        setUserLocation({ latitude: lat, longitude: long });
      },
      (error) => {
        console.log(error, 'error in EmbeddedMap');
      },
      () => {
        console.log('location permission denied');
      },
    );
  }, []);

  const pointsOfInterest: location[] = [...props.placeDetails];

  if (userLocation !== null) {
    const youAreHere: location = {
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      name: 'you',
      type: 'you_are_here',
    };

    pointsOfInterest.push(youAreHere);
  }

  let iconImage: HTMLImageElement = require('../../res/icons/building.png');

  return (
    <View style={styles.mapStyle}>
      <MapView
        style={styles.mapViewStyle}
        initialRegion={{
          latitude: pointsOfInterest[pointsOfInterest.length - 1].latitude,
          longitude: pointsOfInterest[pointsOfInterest.length - 1].longitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.02,
        }}>
        {pointsOfInterest.map((poi, index) => {
          switch (poi.type) {
            case 'art_gallery':
              iconImage = require('../../res/icons/art-gallery.png');
              break;
            case 'bar':
              iconImage = require('../../res/icons/bar.png');
              break;
            case 'cafe':
              iconImage = require('../../res/icons/cafe.png');
              break;
            case 'cinema':
              iconImage = require('../../res/icons/cinema.png');
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
            case 'you_are_here':
              iconImage = require('../../res/icons/marker_pin.png');
              break;
            default:
              iconImage = require('../../res/icons/building.png');
          }

          return (
            <MapMarker
              key={index}
              coordinate={{
                latitude: poi.latitude,
                longitude: poi.longitude,
              }}
              title={poi.name || 'here'}>
              <Text>{poi.name || 'here'}</Text>
              <Image
                source={iconImage}
                style={styles.markerImage}
                resizeMode="contain"
              />
            </MapMarker>
          );
        })}
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
    height: 400,
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
