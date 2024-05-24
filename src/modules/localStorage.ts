import AsyncStorage from '@react-native-async-storage/async-storage';
import { isPlaceIdUnique } from './utils';
import { PlaceThumbnailData } from '../types/route';

export async function addPlaceToStorage(place: PlaceThumbnailData) {
  try {
    const allData = await getAllItems();
    const unique = isPlaceIdUnique(allData, place);
    if (allData === null) {
      const jsonPlace = JSON.stringify([place]);
      await AsyncStorage.setItem('place', jsonPlace);
    } else {
      if (unique) {
        allData.push(place);
        await AsyncStorage.setItem('place', JSON.stringify(allData));
      }
    }
  } catch (e) {
    //do we need to show the user anything
    console.log('error', e);
  }
}

export async function getAllItems(): Promise<PlaceThumbnailData[]> {
  const allData = await AsyncStorage.getItem('place');
  return allData ? JSON.parse(allData) : null;
}
