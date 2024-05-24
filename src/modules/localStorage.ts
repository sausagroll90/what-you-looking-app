import AsyncStorage from '@react-native-async-storage/async-storage';
import { isPlaceIdUnique } from './utils';
import { PlaceThumbnailData } from '../types/route';

export async function addPlaceToStorage(place: PlaceThumbnailData) {
  try {
    const allData = await getAllPlaces();
    const unique = isPlaceIdUnique(allData, place);
    if (allData === null) {
      await setPlaces([place]);
    } else {
      if (unique) {
        allData.push(place);
        await setPlaces(allData);
      }
    }
  } catch (e) {
    //do we need to show the user anything
    console.log('error', e);
  }
}

export async function getAllPlaces(): Promise<PlaceThumbnailData[] | null> {
  const allData = await AsyncStorage.getItem('place');
  return allData ? JSON.parse(allData) : null;
}

export const removePlaceData = async () => {
  try {
    await AsyncStorage.removeItem('place');
  } catch (e) {
    console.log('error in clear', e);
  }
  console.log('All Cleared');
};

export async function setPlaces(data: any) {
  await AsyncStorage.setItem('place', JSON.stringify(data));
}
