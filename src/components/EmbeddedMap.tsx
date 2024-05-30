import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Vibration } from 'react-native';
import MapView, { MapMarker } from 'react-native-maps';
import { getUserLocation } from '../modules/utils';
import { useNavigation } from '@react-navigation/native';
import { MapPageNavigationProp } from '../types/route';
import LoadingSpinner from './LoadingSpinner';

type location = {
  latitude: number;
  longitude: number;
  name?: string;
  type?: string;
  place_id?: string;
};

type EmbeddedMapProps = {
  placeDetails: location[];
};

export default function EmbeddedMap(props: EmbeddedMapProps) {
  const [userLocation, setUserLocation] = useState<location | null>(null);

  const navigation = useNavigation<MapPageNavigationProp>();

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
      name: '',
      type: 'you_are_here',
    };

    pointsOfInterest.push(youAreHere);
  }

  let iconImage: HTMLImageElement = require('../../res/icons/building.png');

  function handlePress(place_id: string | null) {
    if (place_id) {
      Vibration.vibrate(100);
      navigation.push('PlaceDetails', { place_id: place_id });
    }
  }

  return userLocation ? (
    <View style={styles.mapStyle}>
      <MapView
        style={styles.mapViewStyle}
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.01,
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
              iconImage = require('../../res/icons/circle.png');
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
              title={poi.name || 'here'}
              onPress={() => handlePress(poi.place_id || null)}>
              <Text style={styles.text}>{poi.name || ''}</Text>
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
  ) : (
    <LoadingSpinner />
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
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontSize: 13,
  },
});
