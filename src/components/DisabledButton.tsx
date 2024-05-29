import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import { StyleSheet } from 'react-native';

type ButtonProps = { buttonText: string };

export default function DisabledButton(props: ButtonProps): React.JSX.Element {
  return (
    <View style={styles.button}>
      <TouchableHighlight>
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
    backgroundColor: '#494B4B',
    minWidth: 80,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
