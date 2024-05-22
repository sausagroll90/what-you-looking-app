import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import { StyleSheet } from 'react-native';

interface Touch {
  (inputString: string): any;
}
type ButtonProps = { buttonText: string; onPress: Touch };

export default function StyledButton(props: ButtonProps): React.JSX.Element {
  return (
    // <View style={styles.button}>{props.buttonText}</View>
    <View style={styles.button}>
      <TouchableHighlight onPress={props.onPress}>
        <Text style={styles.buttonText}>{props.buttonText}</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderColor: '#07485b',
    borderWidth: 2,
    backgroundColor: '#a8d3dc',
    width: 110,
    height: 48,
  },
  buttonText: {
    fontSize: 16,
    color: '#07485b',
    alignSelf: 'center',
  },
});
