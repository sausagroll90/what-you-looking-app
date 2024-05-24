import React, { useState } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

const types = [
  {
    name: 'Cultural',
    id: 1,
    value: 'cultural',
    children: [
      { name: 'Museums', id: 'museum' },
      { name: 'City Halls', id: 'city_hall' },
      { name: 'Art Galleries', id: 'art_gallery' },
      { name: 'Cinemas', id: 'movies_theater' },
      { name: 'Tourist Sites', id: 'tourist_attraction' },
    ],
  },
  {
    name: 'Food and Drink',
    id: 2,
    value: 'food_drink',
    children: [
      { name: 'Cafes', id: 'cafe' },
      { name: 'Restaurants', id: 'restaurant' },
      { name: 'Bars', id: 'bar' },
    ],
  },
];

export default function Filter({ selectedTypes, setSelectedTypes }) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const onSelectedTypesChange = (selectedTypes: string[]) => {
    setSelectedItems(selectedTypes);
  };
  const onConfirm = () => {
    setSelectedTypes(selectedItems);
  };

  return (
    <View>
      <SectionedMultiSelect
        items={types}
        IconRenderer={Icon}
        uniqueKey="id"
        subKey="children"
        selectText="Filter"
        showDropDowns={true}
        onSelectedItemsChange={onSelectedTypesChange}
        selectedItems={selectedItems}
        hideSearch={true}
        selectToggleIconComponent={
          <FontAwesomeIcon name="chevron-down" size={20} color={'black'} />
        }
        dropDownToggleIconDownComponent={
          <FontAwesomeIcon name="chevron-down" size={20} color={'black'} />
        }
        dropDownToggleIconUpComponent={
          <FontAwesomeIcon name="chevron-up" size={20} color={'black'} />
        }
        unselectedIconComponent={
          <FontAwesomeIcon name="square-o" size={20} color={'black'} />
        }
        selectedIconComponent={
          <FontAwesomeIcon name="check-square-o" size={20} color={'black'} />
        }
        onConfirm={onConfirm}
        showCancelButton={true}
        selectChildren={true}
        showRemoveAll={true}
        parentChipsRemoveChildren={true}
      />
    </View>
  );
}
