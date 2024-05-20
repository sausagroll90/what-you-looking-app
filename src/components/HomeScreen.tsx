import React, { useState } from 'react';
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroTrackingReason,
  ViroTrackingStateConstants,
} from '@viro-community/react-viro';
import testData from '../../test-data.json';
import PointMarker from './PointMarker';

const HomeScreenSceneAR = () => {
  const [pointsOfInterest, setPointsOfInterest] = useState(testData);

  function onInitialised(state: any, reason: ViroTrackingReason) {
    console.log('onInitialised', state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      // compass etc.
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle error
    }
  }
  return (
    <ViroARScene onTrackingUpdated={onInitialised}>
      {testData.results.map((location) => {
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
