import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function LoadingSpinner(): React.JSX.Element {
  return (
    <View style={styles.loadingAnimation}>
      <ActivityIndicator size={100} />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingAnimation: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
});
