import { useNavigation } from '@react-navigation/native';
import {
  ViroAnimations,
  ViroBox,
  ViroMaterials,
} from '@viro-community/react-viro';
import React from 'react';
import { PointMarkerNavigationProp } from '../types/route';

export default function PointMarker(props: {
  name: string;
  place_id: string;
  types: string[];
  position: [number, number, number];
}) {
  const navigation = useNavigation<PointMarkerNavigationProp>();

  const imageSrc =
    props.types[0] === 'museum'
      ? require('../../res/icons/museum.png')
      : props.types[0] === 'cafe'
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
    console.log('In click');

    navigation.push('PlaceDetails', { place_id: props.place_id });
  };

  return (
    <ViroBox
      materials={['building']}
      scale={[50, 50, 50]}
      position={props.position}
      animation={{ name: 'rotate', run: true, loop: true }}
      onClick={handleClick}
      onClickState={() => console.log('I am here')}
    />
  );
}
