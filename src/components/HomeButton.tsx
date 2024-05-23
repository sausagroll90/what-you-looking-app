import { useNavigation } from '@react-navigation/native';
import StyledButton from './StyledButton';
import React from 'react';
import { HomeButtonNavigationProp } from '../types/route';

export default function HomeButton(): React.JSX.Element {
  const navigation = useNavigation<HomeButtonNavigationProp>();

  const handlePress = () => {
    navigation.push('Home');
  };

  return <StyledButton buttonText="Home" onPress={handlePress} />;
}
