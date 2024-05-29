import React, { useEffect, useState } from 'react';
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroAnimations,
  ViroBox,
  ViroMaterials,
  ViroSpinner,
  ViroTrackingReason,
  ViroTrackingStateConstants,
} from '@viro-community/react-viro';
import CompassHeading from 'react-native-compass-heading';
import { getPositionForAR, getUserLocation } from '../modules/utils';
import ErrorScreen from './ErrorScreen';
import { StyleSheet, Text, View } from 'react-native';
import SimpleMenu from './SimpleMenu';

interface Location {
  latitude: number;
  longitude: number;
}

const SavedLocationSceneAR = ({
  arSceneNavigator: {
    viroAppProps: { setError, location },
  },
}: {
  arSceneNavigator: {
    viroAppProps: {
      setError: React.Dispatch<React.SetStateAction<string | null>>;
      location: Location;
    };
  };
}) => {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [compassHeading, setCompassHeading] = useState<number | null>(null);
  const [initialCompassHeading, setInitialCompassHeading] = useState<
    number | null
  >(null);
  const [initialised, setInitialised] = useState<boolean>(false);

  function onInitialised(state: any, reason: ViroTrackingReason) {
    console.log('onInitialised', state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setInitialCompassHeading(compassHeading);
      setInitialised(true);
    }
  }

  useEffect(() => {
    getUserLocation(
      (latitude, longitude) => {
        setUserLocation({
          latitude: latitude,
          longitude: longitude,
        });
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

  function transformPosition() {
    const transformedPosition = getPositionForAR(
      userLocation,
      {
        latitude: location.latitude,
        longitude: location.longitude,
      },
      initialCompassHeading,
    );
    return transformedPosition;
  }

  ViroMaterials.createMaterials({
    marker: {
      diffuseTexture: require('../../res/icons/marker_pin.png'),
    },
  });

  ViroAnimations.registerAnimations({
    rotate: {
      properties: {
        rotateY: '+=180',
      },
      duration: 5000,
    },
  });

  return (
    <ViroARScene onTrackingUpdated={onInitialised}>
      {initialCompassHeading ? (
        <ViroBox
          materials={['marker']}
          scale={[100, 100, 100]}
          position={transformPosition()}
          animation={{ name: 'rotate', run: true, loop: true }}
        />
      ) : null}
      {!initialised ? <ViroSpinner type="dark" position={[0, 0, -3]} /> : null}
    </ViroARScene>
  );
};

export default ({ route }) => {
  const [error, setError] = useState<string | null>(null);
  return !error ? (
    <>
      <View style={styles.container}>
        <SimpleMenu />
        <Text style={styles.title}>Saved Location</Text>
      </View>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{ scene: SavedLocationSceneAR }}
        viroAppProps={{ setError, location: route.params.location }}
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
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#136f63',
    textAlignVertical: 'center',
    width: '100%',
    paddingLeft: 75,
  },
});
