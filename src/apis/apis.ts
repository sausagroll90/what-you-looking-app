export async function getNearbyPOIs(
  latitude: number,
  longitude: number,
  type: string,
) {
  let response;
  try {
    response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1000&type=${type}&key=${PASTEAPIKEYHERE}`,
    );
    if (response.status != 200) {
      console.log('Error fetching from API: ' + response.status);
      return null;
    }
  } catch (error) {
    console.log('Error fetching from API', error);
  }

  const data = await response.json();

  const results: [] = data.results.map((result) => {
    return {
      latitude: result.geometry.location.lat,
      longitude: result.geometry.location.lng,
      name: result.name,
      place_id: result.place_id,
    };
  });

  return results;
}
