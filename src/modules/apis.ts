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
  }[] = data.results
    .map((result: any) => {
      return {
        latitude: result.geometry.location.lat,
        longitude: result.geometry.location.lng,
        name: result.name,
        place_id: result.place_id,
        types: result.types,
      };
    })
    .filter((result: any) => {
      return result.types[0] === type;
    });

  return results;
}

export async function getPlaceDetails(place_id: string): Promise<PlaceData> {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${GOOGLEAPIKEY}`,
  );

  if (response.status !== 200) {
    throw new Error('Error fetching from API: ' + response.status);
  }

  const data = await response.json();
  const townData = data.result.address_components.filter(
    (element: { long_name: string; short_name: string; types: string[] }) =>
      element.types[0] === 'postal_town' || element.types[0] === 'locality',
  );
  const location = townData[0].long_name;

  const results: PlaceData = {
    name: data.result.name,
    rating: data.result.rating,
    place_id: data.result.place_id,
    latitude: data.result.geometry.location.lat,
    longitude: data.result.geometry.location.lng,
    type: data.result.types[0],
    location: location,
  };

  data.result.website ? (results.website = data.result.website) : null;
  data.result.formatted_address
    ? (results.formatted_address = data.result.formatted_address)
    : null;
  data.result.current_opening_hours
    ? (results.current_opening_hours =
        data.result.current_opening_hours.weekday_text)
    : null;
  data.result.editorial_summary
    ? (results.overview = data.result.editorial_summary.overview)
    : null;
  return results;
}

export async function getWikiSummary(placeName: string, location: string) {
  const placeToSearch = placeName.replaceAll(' ', '%20');

  const titleResponse = await fetch(
    `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${location}${placeToSearch}&format=json&srlimit=1`,
  );
  if (titleResponse.status !== 200) {
    throw new Error('Error fetching from API: ' + titleResponse.status);
  }
  const searchResult = await titleResponse.json();
  const pageTitle = searchResult.query.search[0].title;
  const titleToSearch = pageTitle.replaceAll(' ', '%20');
  const pageResponse = await fetch(
    `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=${titleToSearch}`,
  );
  const pageResult = await pageResponse.json();
  const pageSummary =
    pageResult.query.pages[searchResult.query.search[0].pageid].extract;
  return pageSummary;
}
