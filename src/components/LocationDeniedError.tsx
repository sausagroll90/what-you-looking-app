import React from 'react';
import ErrorScreen from './ErrorScreen';

export default function LocationDeniedError(): React.JSX.Element {
  return (
    <ErrorScreen message="Please enable location permission for this app in settings." />
  );
}
