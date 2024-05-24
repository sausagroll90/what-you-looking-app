import AsyncStorage from '@react-native-async-storage/async-storage';
import { isPlaceIdUnique } from './utils';
import { PlaceThumbnailData } from '../types/route';

export async function addPlaceToStorage(
  place: PlaceThumbnailData,
  key: string,
) {
  try {
<
    const allData = await getAllPlaces(key);
    const unique = isPlaceIdUnique(allData, place);
    if (allData === null) {
      await setPlaces([place]);
    } else {
      if (unique) {
        allData.push(place);
        await setPlaces(allData,key);
      }
    }
  } catch (e) {
    //do we need to show the user anything
    console.log('error', e);
  }
}


export async function getAllPlaces(key): Promise<PlaceThumbnailData[] | null> {
  const allData = await AsyncStorage.getItem(key);
  return allData ? JSON.parse(allData) : null;
}

export const removePlaceData = async (key:string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log('error in clear', e);
  }
  console.log('All Cleared');
};

export async function setPlaces(data: any, key:string ) {
  await AsyncStorage.setItem(key, JSON.stringify(data));
}
