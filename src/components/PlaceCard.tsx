import React from 'react';
import { Text } from 'react-native';
import StyledButton from './StyledButton';
import { useNavigation } from '@react-navigation/native';
import { PlaceCardNavigationProp } from '../types/route';

type PlaceDetailProps = {
  placeDetails: { name: string; address: string; place_id: string };
};

export default function PlaceCard(props: PlaceDetailProps) {
  const {
    placeDetails: { name, address, place_id },
  } = props;

  const navigation = useNavigation<PlaceCardNavigationProp>();

  const handlePress = () => {
    navigation.push('PlaceDetails', { place_id: place_id });
  };

  return (
    <>
      <Text>{name}</Text>
      <Text>{address}</Text>
      <StyledButton buttonText="Place details" onPress={handlePress} />
    </>
  );
}
