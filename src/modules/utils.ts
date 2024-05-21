import { GeoPosition } from 'react-native-geolocation-service';

const DEGREES_TO_RADIANS_CONVERSION = (2 * Math.PI) / 360;

export function getRelativePosition(
  userLocation: GeoPosition,
  target: {
    latitude: number;
    longitude: number;
    [key: string]: any;
  },
): { x: number; z: number } {
  const RADIUS_OF_EARTH_IN_METRES = 6_371_000;

  const relativeLatitude = userLocation.coords.latitude - target.latitude;
  const relativeZ =
    relativeLatitude *
    DEGREES_TO_RADIANS_CONVERSION *
    RADIUS_OF_EARTH_IN_METRES;

  const relativeLongitude = target.longitude - userLocation.coords.longitude;
  const latitudeScaleFactor = Math.cos(
    userLocation.coords.latitude * DEGREES_TO_RADIANS_CONVERSION,
  );
  const relativeX =
    relativeLongitude *
    DEGREES_TO_RADIANS_CONVERSION *
    RADIUS_OF_EARTH_IN_METRES *
    latitudeScaleFactor;

  return { x: relativeX, z: relativeZ };
}

export function getPositionForAR(
  userLocation: GeoPosition | null,
  target: { latitude: number; longitude: number; [key: string]: any },
  compassHeading: number,
): [x: number, y: number, z: number] {
  if (!userLocation) {
    throw new Error('user location not found');
  }

  const relativePosition = getRelativePosition(userLocation, target);
  const headingInRadians = compassHeading * DEGREES_TO_RADIANS_CONVERSION;

  return [
    relativePosition.x * Math.cos(headingInRadians) +
      relativePosition.z * Math.sin(headingInRadians),
    0,
    -relativePosition.x * Math.sin(headingInRadians) +
      relativePosition.z * Math.cos(headingInRadians),
  ];
}
