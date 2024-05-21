import { ViroImage } from '@viro-community/react-viro';
import React from 'react';

export default function PointMarker(props: {
  location: {
    geometry: { location: { lat: number; lng: number } };
    types: string[];
  };
}) {
  const imageSrc =
    props.location.types[0] === 'museum'
      ? require('../../res/icons/museum.png')
      : require('../../res/icons/cafe.png');

  return (
    <ViroImage
      source={imageSrc}
      position={[0, 0, -2]}
      scale={[0.3, 0.3, 0.3]}
    />
  );
}
