import React, { useEffect, useState } from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { getEventDetails } from '../modules/apis';
import { EventData } from '../types/route';
import LoadingSpinner from './LoadingSpinner';
import StyledButton from './StyledButton';
import EmbeddedMap from './EmbeddedMap';

export default function EventDetails(): React.JSX.Element {
  const [eventDetails, setEventDetails] = useState<EventData | null>(null);

  // const event_id: string = route.params.event_id;
  const event_id = 'G5dzZ9UnN5xZi';

  async function onEventIdReceived(eventID: string) {
    try {
      const event = await getEventDetails(eventID);
      setEventDetails(event);
    } catch (e) {
      console.log(e);
      console.log('Error fetching event details');
    }
  }

  useEffect(() => {
    onEventIdReceived(event_id);
  }, [event_id]);

  const handlePress = () => {
    if (eventDetails && eventDetails.event_url) {
      Linking.openURL(eventDetails.event_url);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {eventDetails ? (
          <>
            <Text style={styles.name}>{eventDetails.event_name}</Text>
            <Text style={styles.venue}>{eventDetails.event_venue}</Text>
            <Image style={styles.image} src={eventDetails.event_image} />
            <Text style={styles.text}>{eventDetails.event_address}</Text>
            <Text style={styles.text}>{eventDetails.event_date}</Text>
            <Text style={styles.text}>
              Start time: {eventDetails.event_time}
            </Text>
            <View style={styles.button}>
              <StyledButton buttonText="Buy tickets" onPress={handlePress} />
            </View>
            <Text>{eventDetails.event_description}</Text>
            <EmbeddedMap
              placeDetails={[
                {
                  latitude: Number(eventDetails.event_latitude),
                  longitude: Number(eventDetails.event_longitude),
                  name: eventDetails.event_name,
                  type: 'event',
                },
              ]}
            />
          </>
        ) : (
          <LoadingSpinner />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
  },
  image: {
    marginTop: 10,
    width: 500,
    height: 200,
    padding: 0,
  },
  name: {
    fontWeight: 'bold',
    color: '#136f63',
    fontSize: 32,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingTop: 10,
  },
  venue: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
    paddingLeft: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginTop: 10,
    paddingLeft: 10,
  },
  button: {
    alignSelf: 'center',
    marginBottom: 10,
  },
});
