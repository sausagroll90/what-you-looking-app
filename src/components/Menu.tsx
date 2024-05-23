import React, { useRef, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

FontAwesomeIcon.loadFont();
import FilterBy from './FilterBy';
const TYPES = ['museum', 'cafe', 'library', 'bakery', 'church'];

export default function Menu(): React.JSX.Element {
  const [visible, setVisible] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const DropdownButton = useRef<any>();
  const [dropdownTop, setDropdownTop] = useState(100);
  const [visibleTypes, setVisibleTypes] = useState(false);
  const FilterButton = useRef<any>();
  const [filterTop, setFilterTop] = useState(140);

  const toggleDropdown = () => {
    visible ? setVisible(false) : openDropdown();
  };

  const toggleFilter = () => {
    visibleTypes ? setVisibleTypes(false) : openFilter();
  };

  const openDropdown = () => {
    DropdownButton.current
      ? DropdownButton.current.measure(
          (
            _fx: number,
            _fy: number,
            _w: number,
            h: number,
            _px: number,
            py: number,
          ) => {
            setDropdownTop(py + h);
          },
        )
      : null;
    setVisible(true);
  };

  const openFilter = (): void => {
    FilterButton.current.measure(
      (
        _fx: number,
        _fy: number,
        _w: number,
        h: number,
        _px: number,
        py: number,
      ) => {
        setFilterTop(py + h);
      },
    );
    setVisibleTypes(true);
  };

  const handleSelectAll = () => {
    setSelectedTypes(TYPES);
  };

  const handleDeselectAll = () => {
    setSelectedTypes([]);
  };

  return (
    <Modal visible={true} transparent animationType="none">
      <TouchableOpacity
        style={styles.button}
        onPress={toggleDropdown}
        ref={DropdownButton}>
        <FontAwesomeIcon name="navicon" size={25} color={'black'} />
      </TouchableOpacity>
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}>
          <View>
            <TouchableOpacity
              ref={FilterButton}
              onPress={toggleFilter}
              style={[styles.dropdown, { top: dropdownTop }]}>
              <Text>Filter</Text>
              <FontAwesomeIcon
                name={visibleTypes ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={'black'}
              />
            </TouchableOpacity>
            <Modal
              visible={visibleTypes && visible}
              transparent
              animationType="none"
              style={{ top: filterTop }}>
              <TouchableOpacity onPress={() => setVisibleTypes(false)}>
                <View style={[styles.filter, { top: filterTop }]}>
                  <TouchableOpacity
                    onPress={handleSelectAll}
                    style={styles.selectAll}>
                    <Text>Select All</Text>
                    <FontAwesomeIcon
                      name={
                        selectedTypes.length === 5
                          ? 'check-square-o'
                          : 'square-o'
                      }
                      size={20}
                      color={'black'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleDeselectAll}
                    style={styles.selectAll}>
                    <Text>Deselect All</Text>
                    <FontAwesomeIcon
                      name={
                        selectedTypes.length === 0
                          ? 'check-square-o'
                          : 'square-o'
                      }
                      size={20}
                      color={'black'}
                    />
                  </TouchableOpacity>
                  <FilterBy
                    setSelectedTypes={setSelectedTypes}
                    selectedTypes={selectedTypes}
                  />
                </View>
              </TouchableOpacity>
            </Modal>
          </View>
        </TouchableOpacity>
      </Modal>
    </Modal>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: '15%',
    paddingHorizontal: 10,
    zIndex: 1,
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
  },
  dropdown: {
    backgroundColor: 'white',
    width: '100%',
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
    marginLeft: 10,
    paddingRight: 10,
    paddingLeft: 10,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filter: {
    backgroundColor: 'white',
    width: '35%',
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
    marginLeft: 10,
    paddingLeft: 10,
  },
  overlay: {
    width: '35%',
  },
  selectAll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 10,
  },
});
