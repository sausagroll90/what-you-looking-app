import { GOOGLEAPIKEY } from '@env';

export async function getNearbyPOIs(
  latitude: number,
  longitude: number,
  type: string,
) {
  let response;
  try {
    response = await fetch(
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
  } catch (error) {
    console.log(error);
  }
}
