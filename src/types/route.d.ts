import type { NativeStackScreenProps } from '@react-navigation/native-stack';

interface PlaceData {
  formattedAddress: string;
  name: string;
  rating: number;
  weekday_text: string[];
  website: string;
}

type RootStackParamList = {
  PlaceDetails: { placeData: PlaceData };
  Home: undefined;
  Error: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'PlaceDetails'>;
