import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { NavButtonNavigationProp } from '../types/route';

type NavButtonProps = {
  text: string;
  navigationTarget: string;
  style?: { [key: string]: any };
};

export default function NavButton({
  text,
  navigationTarget,
  style,
}: NavButtonProps) {
  const navigation = useNavigation<NavButtonNavigationProp>();

  function handlePress() {
    navigation.push(navigationTarget);
  }

  return (
    <TouchableOpacity style={style} onPress={handlePress}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
}
