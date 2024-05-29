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
  const event_id = 'G5dzZ9MVeV3q2';

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
      <View>
        {eventDetails ? (
          <>
            <Text>{eventDetails.event_name}</Text>
            <Text>{eventDetails.event_venue}</Text>
            <Image style={styles.image} src={eventDetails.event_image} />
            <Text>{eventDetails.event_address}</Text>
            <Text>{eventDetails.event_date}</Text>
            <Text>Start time: {eventDetails.event_time}</Text>
            <StyledButton buttonText="Buy tickets" onPress={handlePress} />
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
  image: {
    width: 200,
    height: 200,
  },
});
