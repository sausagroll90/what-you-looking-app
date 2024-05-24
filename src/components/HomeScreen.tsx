import React, { useEffect, useState } from 'react';
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroSpinner,
  ViroTrackingReason,
  ViroTrackingStateConstants,
} from '@viro-community/react-viro';
import PointMarker from './PointMarker';
import CompassHeading from 'react-native-compass-heading';
import { getNearbyPOIs, getWikiSummary } from '../modules/apis';
import { requestLocationPermission } from '../modules/permissions';
import Geolocation from 'react-native-geolocation-service';
import { getPositionForAR } from '../modules/utils';
import ErrorScreen from './ErrorScreen';
import Menu from './Menu';

const HomeScreenSceneAR = ({
  arSceneNavigator: {
    viroAppProps: { setError, selectedTypes },
  },
}: {
  arSceneNavigator: {
    viroAppProps: {
      setError: React.Dispatch<React.SetStateAction<string | null>>;
      setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
      selectedTypes: string[];
    };
  };
}) => {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
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
  const [initialised, setInitialised] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  function onInitialised(state: any, reason: ViroTrackingReason) {
    console.log('onInitialised', state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setInitialCompassHeading(compassHeading);
      setInitialised(true);
    }
  }

  async function getPointsOfInterest(latitude: number, longitude: number) {
    try {
      const fetchedPromises = selectedTypes.map((type) => {
        return getNearbyPOIs(latitude, longitude, type);
      });
      const data = (await Promise.all(fetchedPromises)).flat();
      if (data) {
        setPointsOfInterest(data);
        setLoading(false);
      }
    } catch (_) {
      setError('Error loading data');
    }
  }

  useEffect(() => {
    async function getUserLocation(): Promise<void> {
      const isGranted = await requestLocationPermission();
      if (isGranted) {
        Geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            getPointsOfInterest(
              position.coords.latitude,
              position.coords.longitude,
            );
          },
          (err) => {
            console.log(err.code, err.message);
            setUserLocation(null);
            setError(err.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      } else {
        setError('please enable location permissions in app settings');
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    userLocation
      ? getPointsOfInterest(userLocation.latitude, userLocation.longitude)
      : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTypes]);

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
      {loading || !initialised ? (
        <ViroSpinner type="dark" position={[0, 0, -3]} />
      ) : null}
    </ViroARScene>
  );
};

export default () => {
  const [error, setError] = useState<string | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['museum']);

  return !error ? (
    <>
      <Menu selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} />

      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{ scene: HomeScreenSceneAR }}
        viroAppProps={{ setError, selectedTypes, setSelectedTypes }}
      />
    </>
  ) : (
    <ErrorScreen message={error} />
  );
};
