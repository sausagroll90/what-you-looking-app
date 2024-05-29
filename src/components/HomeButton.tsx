import { useNavigation } from '@react-navigation/native';
import StyledButton from './StyledButton';
import React, { useState } from 'react';
import { HomeButtonNavigationProp } from '../types/route';

export default function HomeButton(): React.JSX.Element {
  const [selectedFilterTypes, setSelectedFilterTypes] = useState<string[]>([]);
  const navigation = useNavigation<HomeButtonNavigationProp>();

  const handlePress = () => {
    navigation.push('Home', { selectedFilterTypes, setSelectedFilterTypes });
  };

  return <StyledButton buttonText="Home" onPress={handlePress} />;
}
