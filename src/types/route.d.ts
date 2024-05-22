import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface PlaceData {
  // formattedAddress: string;
  // name: string;
  // rating?: number;
  // weekday_text?: string[];
  // website?: string;
  place_id: string;
}

// type RootStackParamList = {
//   PlaceDetails: undefined;
//   Home: undefined;
//   Error: undefined;
//   PointMarker: undefined;
// };

type Props = NativeStackScreenProps<RootStackParamList, 'PlaceDetails'>;

type PointMarkerNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PointMarker'
>;
