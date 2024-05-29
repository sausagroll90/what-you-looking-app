import { Image, StyleSheet } from 'react-native';
import React from 'react';

export default function Logo() {
  return (
    <Image source={require('../../res/logo/logo.png')} style={styles.logo} />
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 60,
    width: 120,
    alignSelf: 'center',
    marginTop: 10,
  },
});
