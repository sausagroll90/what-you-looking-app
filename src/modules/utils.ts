import { PlaceThumbnailData } from '../types/route';
import { requestLocationPermission } from './permissions';
import Geolocation, { GeoError } from 'react-native-geolocation-service';

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

export function isPlaceIdUnique(
  currentData: PlaceThumbnailData[] | null,
  newPlace: PlaceThumbnailData,
) {
  const newPlaceId = newPlace.place_id;
  if (currentData === null) {
    return true;
  }
  return !currentData.some((place) => place.place_id === newPlaceId);
}

export async function getUserLocation(
  onLocationReceived: (latitude: number, longitude: number) => void,
  onError: (err: GeoError) => void,
  onPermissionDenied: () => void,
): Promise<void> {
  const isGranted = await requestLocationPermission();
  if (isGranted) {
    Geolocation.getCurrentPosition(
      (position) => {
        onLocationReceived(position.coords.latitude, position.coords.longitude);
      },
      (err) => {
        onError(err);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  } else {
    onPermissionDenied();
  }
}

export function formatDate(date: string) {
  const dateArray = date.split('-');
  const formattedDate = `${dateArray[2].slice(0, 2)}-${dateArray[1]}-${
    dateArray[0]
  }`;
  return formattedDate;
}
