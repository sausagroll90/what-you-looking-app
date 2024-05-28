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
}) {
  const navigation = useNavigation<PointMarkerNavigationProp>();

  // const imageSrc =
  //   props.types[0] === 'museum'
  //     ? require('../../res/models/slate.jpeg')
  //     : props.types[0] === 'city_hall'
  //     ? require('../../res/icons/city-hall.png')
  //     : props.types[0] === 'art_gallery'
  //     ? require('../../res/icons/art-gallery.png')
  //     : props.types[0] === 'cafe'
  //     ? require('../../res/icons/cafe.png')
  //     : props.types[0] === 'restaurant'
  //     ? require('../../res/icons/restaurant.png')
  //     : props.types[0] === 'bar'
  //     ? require('../../res/icons/bar.png')
  //     : props.types[0] === 'movie_theater'
  //     ? require('../../res/icons/cinema.png')
  //     : props.types[0] === 'tourist_attraction'
  //     ? require('../../res/icons/tourist_attraction.png')
  //     : require('../../res/icons/building.png');

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
    // case 'art_gallery':
    //   objScale = [5, 5, 5];
    //   objSource = require('../../res/models/art_gallery.glb');
    //   objType = 'GLB';
    //   break;
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
  }
  ViroMaterials.createMaterials({
    slate: {
      diffuseTexture: require('../../res/models/slate.jpeg'),
    },
    mug: {
      diffuseTexture: require('../../res/models/ceramic.jpg'),
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
    Vibration.vibrate(100);
    navigation.push('PlaceDetails', { place_id: props.place_id });
  };

  return (
    <ViroNode position={props.position} onClick={handleClick}>
      <ViroAmbientLight color="#ffffff" />

      {imageSrc ? (
        <Viro3DObject
          source={objSource}
          type={objType}
          materials={imageSrc}
          scale={objScale}
          animation={{ name: 'rotate', run: true, loop: true }}
        />
      ) : (
        <Viro3DObject
          source={objSource}
          type={objType}
          scale={objScale}
          animation={{ name: 'rotate', run: true, loop: true }}
        />
      )}
      <ViroText
        style={styles.text}
        text={props.name}
        scale={[100, 100, 100]}
        position={[0, -50, 0]}
        animation={{ name: 'rotate', run: true, loop: true }}
        transformBehaviors={'billboard'}
      />
    </ViroNode>
    // <ViroBox
    //   materials={['building']}
    //   scale={[50, 50, 50]}
    //   position={props.position}
    //   animation={{ name: 'rotate', run: true, loop: true }}
    //   onClick={handleClick}
    // />
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
});
