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
import { getNearbyPOIs } from '../modules/apis';
import { getPositionForAR, getUserLocation } from '../modules/utils';
import ErrorScreen from './ErrorScreen';
import Menu from './Menu';
import { HomeScreenProps } from '../types/route';
import { LogBox, StyleSheet, Text, View } from 'react-native';
import Logo from './Logo';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state.',
]);

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
    getUserLocation(
      (latitude, longitude) => {
        setUserLocation({
          latitude: latitude,
          longitude: longitude,
        });
        getPointsOfInterest(latitude, longitude);
      },
      (err) => {
        console.log(err.code, err.message);
        setUserLocation(null);
        setError(err.message);
      },
      () => {
        setError('please enable location permissions in app settings');
      },
    );

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

export default ({ route }: HomeScreenProps) => {
  const [error, setError] = useState<string | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['museum']);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(
    route.params.selectedFilterTypes,
  );

  return !error ? (
    <>
      <View style={styles.container}>
        <Menu
          setSelectedTypes={setSelectedTypes}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          setSelectedFilterTypes={route.params.setSelectedFilterTypes}
          currentScreen="home"
        />
        <Text style={styles.title}>Home</Text>
        <Logo />
      </View>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{ scene: HomeScreenSceneAR }}
        viroAppProps={{ setError, selectedTypes }}
      />
    </>
  ) : (
    <ErrorScreen message={error} />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 3,
    width: '100%',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#136f63',
    textAlignVertical: 'center',
    paddingLeft: 65,
  },
});
