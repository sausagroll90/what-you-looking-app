import { useNavigation } from '@react-navigation/native';
import {
  Viro3DObject,
  ViroAmbientLight,
  ViroAnimations,
  ViroBox,
  ViroMaterials,
  ViroNode,
  ViroText,
} from '@viro-community/react-viro';
import React from 'react';
import { PointMarkerNavigationProp } from '../types/route';
import { StyleSheet, Vibration } from 'react-native';

export default function PointMarker(props: {
  name: string;
  place_id: string;
  types: string[];
  position: [number, number, number];
  onClick: () => void;
}) {
  const navigation = useNavigation<PointMarkerNavigationProp>();

  const type = props.types[0];
  let objScale = [100, 100, 100];
  let imageSrc;
  let objSource = '';
  let objType = 'OBJ';

  switch (type) {
    case 'museum':
      objScale = [8, 8, 8];
      imageSrc = 'slate';
      objSource = require('../../res/models/museum.obj');
      break;
    case 'city_hall':
      objScale = [1, 1, 1];
      objSource = require('../../res/models/city_hall.glb');
      objType = 'GLB';
      break;
    case 'art_gallery':
      objScale = [50, 50, 50];
      objSource = require('../../res/models/art_gallery.glb');
      objType = 'GLB';
      break;
    case 'movie_theater':
      objScale = [0.3, 0.3, 0.3];
      objSource = require('../../res/models/cinema/cinema.obj');
      break;
    case 'tourist_attraction':
      objScale = [300, 300, 300];
      objSource = require('../../res/models/tourist_site.glb');
      objType = 'GLB';
      break;
    case 'cafe':
      objScale = [7, 7, 7];
      objSource = require('../../res/models/cafe.glb');
      objType = 'GLB';
      break;
    case 'restaurant':
      objScale = [35, 35, 35];
      objSource = require('../../res/models/burger.glb');
      objType = 'GLB';
      break;
    case 'bar':
      objScale = [150, 150, 150];
      objSource = require('../../res/models/wine/wine.obj');
      break;
  }
  ViroMaterials.createMaterials({
    slate: {
      diffuseTexture: require('../../res/models/slate.jpeg'),
    },
    mug: {
      diffuseTexture: require('../../res/models/ceramic.jpg'),
    },
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

  let dragged: boolean = false;

  const handleDrag = (dragProps: any) => {
    if (Math.abs(props.position[0] - dragProps[0]) > 5) {
      dragged = true;
    }
  };

  const resizeScale = (scale: number[]) => {
    const RESIZE_FACTOR = 0.12;
    return scale.map((scaleValue) => scaleValue * RESIZE_FACTOR);
  };

  const handleClick = props.onClick;

  return (
    <ViroNode
      position={props.position}
      onClick={handleClick}
      onDrag={handleDrag}>
      <ViroAmbientLight color="#ffffff" />

      {type === 'event' ? (
        <ViroBox
          materials={['marker']}
          scale={[20, 20, 20]}
          position={props.position}
          animation={{ name: 'rotate', run: true, loop: true }}
        />
      ) : imageSrc ? (
        <Viro3DObject
          source={objSource}
          type={objType}
          materials={imageSrc}
          scale={resizeScale(objScale)}
          animation={{ name: 'rotate', run: true, loop: true }}
        />
      ) : (
        <Viro3DObject
          source={objSource}
          type={objType}
          scale={resizeScale(objScale)}
          animation={{ name: 'rotate', run: true, loop: true }}
        />
      )}
      <ViroText
        style={styles.text}
        text={props.name}
        scale={[25, 25, 25]}
        position={type === 'event' ? [0, -20, 0] : [0, -12.5, 0]}
        animation={{ name: 'rotate', run: true, loop: true }}
        transformBehaviors={'billboard'}
      />
    </ViroNode>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
});
