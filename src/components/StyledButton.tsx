import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import { StyleSheet } from 'react-native';

type ButtonProps = { buttonText: string; onPress: () => void };

export default function StyledButton(props: ButtonProps): React.JSX.Element {
  return (
    <View style={styles.button}>
      <TouchableHighlight onPress={props.onPress}>
        <Text style={styles.buttonText}>{props.buttonText}</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
    padding: 10,
    borderColor: '#032b43',
    borderWidth: 2,
    backgroundColor: '#a8d3dc',
    minWidth: 80,
    borderRadius: 10,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#032b43',
    textAlign: 'center',
  },
});
