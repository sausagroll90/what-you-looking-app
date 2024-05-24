import { Modal, View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';

export function OnSave() {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const TOAST_DURATION_MILISECONDS = 3000;
  setTimeout(() => setIsVisible(false), TOAST_DURATION_MILISECONDS);

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          setIsVisible(false);
        }}>
        <View>
          <View style={styles.saveView}>
            <Text>Added to favourites!</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  saveView: {
    margin: 20,
    backgroundColor: 'white',
    padding: 35,
  },
});
