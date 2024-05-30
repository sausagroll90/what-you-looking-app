import { GOOGLEAPIKEY, TICKETMASTERAPIKEY } from '@env';
import { EventData, PlaceData } from '../types/route';

export async function getNearbyPOIs(
  latitude: number,
  longitude: number,
  type: string,
  radius: number,
) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${GOOGLEAPIKEY}`,
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

export async function getNearbyEvents(latitude: number, longitude: number) {
  const response = await fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TICKETMASTERAPIKEY}&latlong=${latitude},${longitude}&radius=1&unit=km&sort=distance,asc&size=5`,
  );

  if (response.status !== 200) {
    throw new Error('Error fetching from API: ' + response.status);
  }

  const data = await response.json();
  const results: {
    latitude: number;
    longitude: number;
    name: string;
    event_id: string;
  }[] = data._embedded.events.map((result: any) => {
    return {
      name: result.name,
      place_id: result.id,
      latitude: result._embedded.venues[0].location.latitude,
      longitude: result._embedded.venues[0].location.longitude,
      types: ['event'],
    };
  });

  return results;
}

export async function getEventDetails(event_id: string) {
  const response = await fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TICKETMASTERAPIKEY}&id=${event_id}`,
  );

  if (response.status !== 200) {
    throw new Error('Error fetching from API: ' + response.status);
  }

  const data = await response.json();

  const splitDate = data._embedded.events[0].dates.start.localDate.split('-');
  const formattedDate = splitDate[2] + '/' + splitDate[1] + '/' + splitDate[0];

  const formattedAddress =
    data._embedded.events[0]._embedded.venues[0].address.line1 +
    ', ' +
    data._embedded.events[0]._embedded.venues[0].city.name +
    ', ' +
    data._embedded.events[0]._embedded.venues[0].postalCode;

  const results: EventData = {
    event_name: data._embedded.events[0].name,
    event_url: data._embedded.events[0].url,
    event_image: data._embedded.events[0].images[0].url,
    event_venue: data._embedded.events[0]._embedded.venues[0].name,
    event_address: formattedAddress,
    event_date: formattedDate,
    event_time: data._embedded.events[0].dates.start.localTime.slice(0, 5),
    event_latitude:
      data._embedded.events[0]._embedded.venues[0].location.latitude,
    event_longitude:
      data._embedded.events[0]._embedded.venues[0].location.longitude,
  };

  data._embedded.events[0].description
    ? (results.event_description = data._embedded.events[0].description)
    : null;

  return results;
}
