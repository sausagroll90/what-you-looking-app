import React, { useEffect, useState } from 'react';
import EmbeddedMap from './EmbeddedMap';
import { LogBox, StyleSheet, Text, View } from 'react-native';
import Menu from './Menu';
import { getNearbyPOIs } from '../modules/apis';
import { getUserLocation } from '../modules/utils';
import ErrorScreen from './ErrorScreen';
import LoadingSpinner from './LoadingSpinner';
import { MapPageProps } from '../types/route';
import Logo from './Logo';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state.',
]);

export default function MapPage({ route }: MapPageProps): React.JSX.Element {
  const [error, setError] = useState<string | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    route.params.selectedFilterTypes,
  );
  const [selectedFilters, setSelectedFilters] = useState<string[]>(
    route.params.selectedFilterTypes,
  );
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
      const SEARCH_RADIUS = 1000;
      try {
        const fetchedPromises = selectedTypes.map((type) => {
          return getNearbyPOIs(latitude, longitude, type, SEARCH_RADIUS);
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

    getUserLocation(
      fetchPlaces,
      (err) => {
        console.log(err.code, err.message);
        setError(err.message);
      },
      () => {
        setError('please enable location permissions in app settings');
      },
    );
  }, [selectedTypes]);

  return error ? (
    <ErrorScreen message={error} />
  ) : loading ? (
    <LoadingSpinner />
  ) : (
    <>
      <View style={styles.container}>
        <Menu
          setSelectedTypes={setSelectedTypes}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          setSelectedFilterTypes={route.params.setSelectedFilterTypes}
          currentScreen="map"
        />
        <Text style={styles.title}>Map View</Text>
        <Logo />
      </View>
      <EmbeddedMap
        placeDetails={pointsOfInterest.map((pointOfInterest) => {
          return { ...pointOfInterest, type: pointOfInterest.types[0] };
        })}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 3,
    width: '100%',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#136f63',
    textAlignVertical: 'center',
    paddingLeft: 45,
  },
});
