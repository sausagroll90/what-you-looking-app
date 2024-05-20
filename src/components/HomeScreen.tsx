import React from 'react';
import { ViroARScene, ViroARSceneNavigator } from '@viro-community/react-viro';

export default function HomeScreen() {
  const DefaultView = () => {
    const onInitialised = (reason) => {
      console.log('Reason', reason);
    };
    return <ViroARScene onTrackingUpdated={onInitialised} />;
  };

  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: DefaultView,
      }}
    />
  );
}
