import AsyncStorage from '@react-native-async-storage/async-storage';
import { isPlaceIdUnique } from './utils';
import { PlaceThumbnailData } from '../types/route';

export async function addPlaceToStorage(
  place: PlaceThumbnailData,
  key: string,
) {
  try {
    const allData = await getAllItems(key);
    const unique = isPlaceIdUnique(allData, place);
    if (allData === null) {
      const jsonPlace = JSON.stringify([place]);
      await AsyncStorage.setItem(key, jsonPlace);
    } else {
      if (unique) {
        allData.push(place);
        await AsyncStorage.setItem(key, JSON.stringify(allData));
      }
    }
  } catch (e) {
    //do we need to show the user anything
    console.log('error', e);
  }
}

export async function getAllItems(key: string): Promise<PlaceThumbnailData[]> {
  const allData = await AsyncStorage.getItem(key);
  return allData ? JSON.parse(allData) : null;
}
