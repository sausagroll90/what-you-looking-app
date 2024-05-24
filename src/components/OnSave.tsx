import { Modal, View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import StyledButton from './StyledButton';

export function OnSave() {
  const [isVisible, setIsVisible] = useState<boolean>(true);

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
            <Text>You have added this place to your favorites list!</Text>
            <StyledButton
              buttonText="Close"
              onPress={() => setIsVisible(false)}
            />
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
