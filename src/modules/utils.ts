import Geolocation from 'react-native-geolocation-service';
import { useState } from 'react';

const DEGREES_TO_RADIANS_CONVERSION = (2 * Math.PI) / 360;

export function getRelativePosition(
  userLocation: { latitude: number; longitude: number },
  targetLocation: {
    latitude: number;
    longitude: number;
  },
): { x: number; z: number } {
  const RADIUS_OF_EARTH_IN_METRES = 6_371_000;

  const relativeLatitude = userLocation.latitude - targetLocation.latitude;
  const relativeZ =
    relativeLatitude *
    DEGREES_TO_RADIANS_CONVERSION *
    RADIUS_OF_EARTH_IN_METRES;

  const relativeLongitude = targetLocation.longitude - userLocation.longitude;
  const latitudeScaleFactor = Math.cos(
    userLocation.latitude * DEGREES_TO_RADIANS_CONVERSION,
  );
  const relativeX =
    relativeLongitude *
    DEGREES_TO_RADIANS_CONVERSION *
    RADIUS_OF_EARTH_IN_METRES *
    latitudeScaleFactor;

  return { x: relativeX, z: relativeZ };
}

export function getPositionForAR(
  userLocation: { latitude: number; longitude: number } | null,
  targetLocation: { latitude: number; longitude: number },
  compassHeading: number,
): [x: number, y: number, z: number] {
  if (!userLocation) {
    throw new Error('user location not found');
  }

  const relativePosition = getRelativePosition(userLocation, targetLocation);
  const headingInRadians = compassHeading * DEGREES_TO_RADIANS_CONVERSION;

  return [
    relativePosition.x * Math.cos(headingInRadians) +
      relativePosition.z * Math.sin(headingInRadians),
    0,
    -relativePosition.x * Math.sin(headingInRadians) +
      relativePosition.z * Math.cos(headingInRadians),
  ];
}

// type location =
// {
//   latitude: number;
//   longitude: number;
// }

export function getUserLocation(setUserLocation: any): void {
  // const [userLocation, setUserLocation] = useState<location | null>(null);

  // const [error, setError] = useState<string | null>(null);

  async function getLocation(): Promise<void> {
    Geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => {
        console.log(err.code, err.message);
        setUserLocation(null);
        // setError(err.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }

  getLocation();
  // if(error) {
  //   console.log(error, "error in getUserLocation in utils");
  //   return null;
  // } else {
  //   return userLocation;
  // }
}
