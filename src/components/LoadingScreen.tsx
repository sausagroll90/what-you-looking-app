import React from 'react';
import LottieView from 'lottie-react-native';

export default function LoadingScreen(): React.JSX.Element {
  return (
    <LottieView
      source={require('../../res/AppLoadingAnimation.json')}
      style={{ width: '100%', height: '100%' }}
      autoPlay
      loop
    />
  );
}
