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

const HomeScreenSceneAR = () => {
  const [pointsOfInterest, setPointsOfInterest] = useState(testData);
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

  useEffect(() => {
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
      {pointsOfInterest.results.map((location) => {
        return <PointMarker key={location.place_id} location={location} />;
      })}
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
