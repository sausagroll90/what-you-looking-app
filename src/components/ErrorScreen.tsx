import React from 'react';
import { Text, View } from 'react-native';

type ErrorScreenProps = { message: string };

export default function ErrorScreen(
  props: ErrorScreenProps,
): React.JSX.Element {
  return (
    <View>
      <Text>{props.message}</Text>
    </View>
  );
}
