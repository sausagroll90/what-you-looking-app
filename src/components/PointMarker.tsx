import {
  ViroAnimations,
  ViroBox,
  ViroMaterials,
} from '@viro-community/react-viro';
import React from 'react';

export default function PointMarker(props: {
  location: {
    geometry: { location: { lat: number; lng: number } };
    types: string[];
    name: string;
  };
}) {
  const imageSrc =
    props.location.types[0] === 'museum'
      ? require('../../res/icons/museum.png')
      : props.location.types[0] === 'cafe'
      ? require('../../res/icons/cafe.png')
      : require('../../res/icons/building.png');

  ViroMaterials.createMaterials({
    building: {
      diffuseTexture: imageSrc,
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

  const handleClick = () => {
    console.log('clicked');
  };

  return (
    <ViroBox
      materials={['building']}
      scale={[0.3, 0.3, 0.3]}
      position={[0, 0, -1]}
      animation={{ name: 'rotate', run: true, loop: true }}
      onClick={handleClick}
    />
  );
}
