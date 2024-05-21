import React, { useEffect, useState } from 'react';
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroTrackingReason,
  ViroTrackingStateConstants,
} from '@viro-community/react-viro';
import testData from '../../test-data.json';
import PointMarker from './PointMarker';
import CompassHeading from 'react-native-compass-heading';
import { getNearbyPOIs } from '../modules/apis';
import { requestLocationPermission } from '../modules/permissions';
import Geolocation, { GeoPosition } from 'react-native-geolocation-service';
import { getPositionForAR } from '../modules/utils';

const HomeScreenSceneAR = () => {
  const [userLocation, setUserLocation] = useState<GeoPosition | null>(null);
  const [error, setError] = useState<'location' | null>(null);
  const [pointsOfInterest, setPointsOfInterest] = useState<
    {
      latitude: number;
      longitude: number;
      name: string;
      place_id: string;
      types: string[];
    }[]
  >([]);
  const [compassHeading, setCompassHeading] = useState<number | null>(null);
  const [initialCompassHeading, setInitialCompassHeading] = useState<
    number | null
  >(null);

  function onInitialised(state: any, reason: ViroTrackingReason) {
    console.log('onInitialised', state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setInitialCompassHeading(compassHeading);
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle error
    }
  }

  async function onLocationReceived(position: GeoPosition) {
    const POI_TYPE = 'museum';
    const data = await getNearbyPOIs(
      position.coords.latitude,
      position.coords.longitude,
      POI_TYPE,
    );
    if (data) {
      setPointsOfInterest(data);
    }
  }

  useEffect(() => {
    async function getUserLocation(): Promise<void> {
      const isGranted = await requestLocationPermission();
      if (isGranted) {
        Geolocation.getCurrentPosition(
          (position) => {
            setUserLocation(position);
            onLocationReceived(position);
          },
          (err) => {
            console.log(err.code, err.message);
            setUserLocation(null);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      } else {
        setError('location');
      }
    }
    getUserLocation();

    const DEGREE_UPDATE_RATE = 3;

    CompassHeading.start(
      DEGREE_UPDATE_RATE,
      ({ heading }: { heading: number }) => {
        setCompassHeading(heading);
      },
    );

    return () => {
      CompassHeading.stop();
    };
  }, []);

  return (
    <ViroARScene onTrackingUpdated={onInitialised}>
      {initialCompassHeading
        ? pointsOfInterest.map((location) => {
            const transformedPosition = getPositionForAR(
              userLocation,
              { latitude: location.latitude, longitude: location.longitude },
              initialCompassHeading,
            );
            return (
              <PointMarker
                key={location.place_id}
                name={location.name}
                place_id={location.place_id}
                types={location.types}
                position={transformedPosition}
              />
            );
          })
        : null}
    </ViroARScene>
  );
};

export default () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{ scene: HomeScreenSceneAR }}
    />
  );
};
