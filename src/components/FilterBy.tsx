import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
FontAwesomeIcon.loadFont();
const DATA = [
  {
    id: '1',
    title: 'Museums',
    value: 'museum',
  },
  {
    id: '2',
    title: 'Cafes',
    value: 'cafe',
  },
  {
    id: '3',
    title: 'Libraries',
    value: 'library',
  },
  {
    id: '4',
    title: 'Bakeries',
    value: 'bakery',
  },
  {
    id: '5',
    title: 'Churches',
    value: 'church',
  },
];

type ItemProps = {
  onPress: () => void;
  item: { id: string; title: string; value: string };
  selectedTypes: string[];
};

type FilterByProps = {
  selectedTypes: string[];
  setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
};

const Item = ({ item, onPress, selectedTypes }: ItemProps) => (
  <TouchableOpacity onPress={onPress} style={styles.listItem}>
    <Text>{item.title}</Text>
    <FontAwesomeIcon
      name={selectedTypes.includes(item.value) ? 'check-square-o' : 'square-o'}
      size={20}
      color={'black'}
    />
  </TouchableOpacity>
);

export default function FilterBy({
  setSelectedTypes,
  selectedTypes,
}: FilterByProps) {
  const renderItem = ({
    item,
  }: {
    item: { id: string; title: string; value: string };
  }) => {
    return (
      <Item
        item={item}
        selectedTypes={selectedTypes}
        onPress={() => {
          setSelectedTypes((currentTypes) => {
            const selected = item.value;
            if (!currentTypes.includes(selected)) {
              return [...currentTypes, selected];
            } else {
              const modifiedTypes = currentTypes.filter((type) => {
                return type !== selected;
              });
              return modifiedTypes;
            }
          });
        }}
      />
    );
  };

  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 10,
    height: 50,
    fontSize: 20,
  },
});
