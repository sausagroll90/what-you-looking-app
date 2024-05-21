import React from 'react';
import { Text, View } from 'react-native';
import { Props } from '../types/route';

export default function PlaceDetails({ route }: Props): React.JSX.Element {
  const { formattedAddress, name, rating, weekday_text, website } =
    route.params.placeData;

  return (
    <View>
      <Text>{name}</Text>
      <Text>{formattedAddress}</Text>
      <Text>{rating} rating</Text>
      <Text>{weekday_text}</Text>
      <Text>{website}</Text>
    </View>
  );
}
