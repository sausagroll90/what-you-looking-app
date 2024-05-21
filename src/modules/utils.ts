import { GeoPosition } from 'react-native-geolocation-service';

const DEGREES_TO_RADIANS_CONVERSION = (2 * Math.PI) / 360;

export function getRelativePosition(
  userLocation: GeoPosition | null,
  target: {
    latitude: number;
    longitude: number;
  },
): { x: number; z: number } {
  if (!userLocation) {
    throw new Error('user location not found');
  }

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
