import { ViroImage } from '@viro-community/react-viro';
import React from 'react';

export default function PointMarker() {
  return (
    <ViroImage
      source={require('../../res/icons/museum.png')}
      position={[0, 0, -2]}
      scale={[0.3, 0.3, 0.3]}
    />
  );
}
