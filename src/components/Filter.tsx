import React, { useState } from 'react';
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

type FilterProps = {
  setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedFilterTypes: React.Dispatch<React.SetStateAction<string[]>>;
  selectedFilterTypes: string[];
};

export default function Filter({
  setSelectedTypes,
  selectedFilters,
  setSelectedFilterTypes,
  setSelectedFilters,
}: FilterProps) {
  const onSelectedTypesChange = (selectedTypes: string[]) => {
    setSelectedFilters(selectedTypes);
    setSelectedFilterTypes(selectedTypes);
  };
  const onConfirm = () => {
    setSelectedTypes(selectedFilters);
  };

  return (
    <SectionedMultiSelect
      items={types}
      IconRenderer={Icon}
      uniqueKey="id"
      subKey="children"
      selectText="Filter"
      showDropDowns={true}
      expandDropDowns={true}
      onSelectedItemsChange={onSelectedTypesChange}
      selectedItems={selectedFilters}
      showChips={false}
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
      modalAnimationType="fade"
      modalWithTouchable={true}
      alwaysShowSelectText={true}
    />
  );
}
