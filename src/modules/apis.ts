import { GOOGLEAPIKEY } from '@env';

export async function getNearbyPOIs(
  latitude: number,
  longitude: number,
  type: string,
) {
  let response: any;
  try {
    response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1000&type=${type}&key=${GOOGLEAPIKEY}`,
    );
    if (response.status !== 200) {
      throw new Error('Error fetching from API: ' + response.status);
    }
  } catch (error) {
    console.log('Error fetching from API', error);
  }

  const data = await response.json();

  const results: {
    latitude: number;
    longitude: number;
    name: string;
    place_id: string;
  }[] = data.results.map((result: any) => {
    return {
      latitude: result.geometry.location.lat,
      longitude: result.geometry.location.lng,
      name: result.name,
      place_id: result.place_id,
    };
  });

  return results;
}

export async function getPlaceDetails(place_id: string) {
  let response: any;
  try {
    response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${GOOGLEAPIKEY}`,
    );
    if (response.status !== 200) {
      throw new Error('Error fetching from API: ' + response.status);
    }
  } catch (error) {
    console.log('Error fetching from API', error);
  }

  const data = await response.json();

  const results: {
    formatted_address?: string;
    name: string;
    rating?: number;
    current_opening_hours?: string[];
    website?: string;
    place_id: string;
  } = {
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

  return results;
}
