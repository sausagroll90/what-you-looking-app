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

type RootStackParamList = {
  PlaceDetails: {
    place_id: string;
    showButton?: boolean;
  };
  Home: {
    selectedFilterTypes: string[];
    setSelectedFilterTypes: React.Dispatch<React.SetStateAction<string[]>>;
  };
  Favourites:
    | {
        key: string;
      }
    | undefined;
  History: {
    key: string;
  };
  Map: {
    selectedFilterTypes: string[];
    setSelectedFilterTypes: React.Dispatch<React.SetStateAction<string[]>>;
  };
  SaveLocation: undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

interface EventData {
  event_name: string;
  event_url: string;
  event_image: string;
  event_venue: string;
  event_address: string;
  event_date: string;
  event_time: string;
}

type PlaceDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'PlaceDetails'
>;

type FavouritesProps = NativeStackScreenProps<RootStackParamList, 'Favourites'>;

type HistoryProps = NativeStackScreenProps<RootStackParamList, 'History'>;

type MapPageProps = NativeStackScreenProps<RootStackParamList, 'Map'>;

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

interface SavedLocationData {
  latitude: number;
  longitude: number;
  name: string;
  date: number;
}

type NavButtonNavigationProp = NativeStackNavigationProp<RootStackParamList>;
