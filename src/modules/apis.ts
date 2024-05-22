import { GOOGLEAPIKEY } from '@env';
import { PlaceData } from '../types/route';

export async function getNearbyPOIs(
  latitude: number,
  longitude: number,
  type: string,
) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1000&type=${type}&key=${GOOGLEAPIKEY}`,
  );

  if (response.status !== 200) {
    throw new Error('Error fetching from API: ' + response.status);
  }

  const data = await response.json();

  const results: {
    latitude: number;
    longitude: number;
    name: string;
    place_id: string;
    types: string[];
  }[] = data.results.map((result: any) => {
    return {
      latitude: result.geometry.location.lat,
      longitude: result.geometry.location.lng,
      name: result.name,
      place_id: result.place_id,
      types: result.types,
    };
  });

  return results;
}

export async function getPlaceDetails(place_id: string) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${GOOGLEAPIKEY}`,
  );

  if (response.status !== 200) {
    throw new Error('Error fetching from API: ' + response.status);
  }

  const data = await response.json();

  const results: PlaceData = {
    name: data.result.name,
    rating: data.result.rating,
    place_id: data.result.place_id,
  };

  data.result.website ? (results.website = data.result.website) : null;
  data.result.formatted_address
    ? (results.formatted_address = data.result.formatted_address)
    : null;
  data.result.current_opening_hours
    ? (results.current_opening_hours =
        data.result.current_opening_hours.weekday_text)
    : null;
  data.result.editorial_summary.overview
    ? (results.overview = data.result.editorial_summary.overview)
    : null;

  return results;
}
