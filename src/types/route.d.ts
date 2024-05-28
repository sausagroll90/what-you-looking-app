import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface PlaceData {
  formatted_address?: string;
  name: string;
  rating?: number;
  current_opening_hours?: string[];
  website?: string;
  place_id: string;
  overview?: string;
  latitude: number;
  longitude: number;
  type?: string;
  location: string;
}

type PlaceDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'PlaceDetails'
>;

type PointMarkerNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PointMarker'
>;

type PlaceCardNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PlaceCard'
>;

type HomeButtonNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'HomeButton'
>;

interface PlaceThumbnailData {
  name: string;
  address: string | undefined;
  place_id: string;
}

type NavButtonNavigationProp = NativeStackNavigationProp<>;

type MapPageNavigationProp = NativeStackNavigationProp<>;
