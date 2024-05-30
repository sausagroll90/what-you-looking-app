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
import { getNearbyEvents, getNearbyPOIs } from '../modules/apis';
import { getPositionForAR, getUserLocation } from '../modules/utils';
import ErrorScreen from './ErrorScreen';
import Menu from './Menu';
import { HomeScreenProps, PointMarkerNavigationProp } from '../types/route';
import { LogBox, StyleSheet, Text, Vibration, View } from 'react-native';
import Logo from './Logo';
import SimpleMenu from './SimpleMenu';
import { useNavigation } from '@react-navigation/native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state.',
]);

const EventScreenSceneAR = ({
  arSceneNavigator: {
    viroAppProps: { setError },
  },
}: {
  arSceneNavigator: {
    viroAppProps: {
      setError: React.Dispatch<React.SetStateAction<string | null>>;
    };
  };
}) => {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [events, setEvents] = useState<
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
  const navigation = useNavigation<PointMarkerNavigationProp>();

  function onInitialised(state: any, reason: ViroTrackingReason) {
    console.log('onInitialised', state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setInitialCompassHeading(compassHeading);
      setInitialised(true);
    }
  }

  async function getEvents(latitude: number, longitude: number) {
    try {
      const data = await getNearbyEvents(latitude, longitude);
      if (data) {
        setEvents(data);
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
        getEvents(latitude, longitude);
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

  return (
    <ViroARScene onTrackingUpdated={onInitialised}>
      {initialCompassHeading
        ? events.map((event) => {
            const transformedPosition = getPositionForAR(
              userLocation,
              { latitude: event.latitude, longitude: event.longitude },
              initialCompassHeading,
            );
            return (
              <PointMarker
                key={event.place_id}
                name={event.name}
                place_id={event.place_id}
                types={event.types}
                position={transformedPosition}
                onClick={() => {
                  Vibration.vibrate(100);
                  navigation.push('EventDetails', { place_id: event.place_id });
                }}
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

  return !error ? (
    <>
      <View style={styles.container}>
        <SimpleMenu />
        <Text style={styles.title}>Events</Text>
        <Logo />
      </View>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{ scene: EventScreenSceneAR }}
        viroAppProps={{ setError }}
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
