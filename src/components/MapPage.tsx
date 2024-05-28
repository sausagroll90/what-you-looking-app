import React, { useEffect, useState } from 'react';
import EmbeddedMap from './EmbeddedMap';
import { MapPageNavigationProp } from '../types/route';
import { LogBox } from 'react-native';
import Menu from './Menu';
import { getNearbyPOIs } from '../modules/apis';
import { requestLocationPermission } from '../modules/permissions';
import Geolocation from 'react-native-geolocation-service';
import ErrorScreen from './ErrorScreen';
import LoadingSpinner from './LoadingSpinner';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state.',
]);

export default function MapPage({
  route,
}: MapPageNavigationProp): React.JSX.Element {
  const [error, setError] = useState<string | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['museum']);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(
    route.params.selectedFilterTypes,
  );
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [pointsOfInterest, setPointsOfInterest] = useState<
    {
      latitude: number;
      longitude: number;
      name: string;
      place_id: string;
      types: string[];
    }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlaces(latitude: number, longitude: number) {
      try {
        const fetchedPromises = selectedTypes.map((type) => {
          return getNearbyPOIs(latitude, longitude, type);
        });
        const data = (await Promise.all(fetchedPromises)).flat();
        if (data) {
          setPointsOfInterest(data);
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
        setError('Error loading data');
      }
    }

    async function getUserLocation(): Promise<void> {
      const isGranted = await requestLocationPermission();
      if (isGranted) {
        Geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            fetchPlaces(position.coords.latitude, position.coords.longitude);
          },
          (err) => {
            console.log(err.code, err.message);
            setUserLocation(null);
            setError(err.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      } else {
        setError('please enable location permissions in app settings');
      }
    }

    getUserLocation();
  }, [selectedTypes]);

  console.log(userLocation);
  console.log(pointsOfInterest);

  return error ? (
    <ErrorScreen message={error} />
  ) : loading ? (
    <LoadingSpinner />
  ) : (
    <>
      <Menu
        setSelectedTypes={setSelectedTypes}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        setSelectedFilterTypes={route.params.setSelectedFilterTypes}
      />
      <EmbeddedMap placeDetails={pointsOfInterest[0]} />
    </>
  );
}
