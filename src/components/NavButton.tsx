import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { NavButtonNavigationProp, RootStackParamList } from '../types/route';

type NavButtonProps = {
  text: string;
  navigationTarget: keyof RootStackParamList;
  top: number;
};

export default function NavButton({
  text,
  navigationTarget,
  top,
}: NavButtonProps) {
  const navigation = useNavigation<NavButtonNavigationProp>();

  function handlePress() {
    navigation.push(navigationTarget);
  }

  return (
    <TouchableOpacity
      style={[styles.navButton, { top: top }]}
      onPress={handlePress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  navButton: {
    height: 80,
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 19,
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
});
