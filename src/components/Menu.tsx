import React, { useRef, useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

FontAwesomeIcon.loadFont();
import NavButton from './NavButton';
import Filter from './Filter';

type MenuProps = {
  setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedFilterTypes: React.Dispatch<React.SetStateAction<string[]>>;
};
export default function Menu({
  setSelectedTypes,
  selectedFilters,
  setSelectedFilters,
  setSelectedFilterTypes,
}: MenuProps): React.JSX.Element {
  const [visible, setVisible] = useState(false);
  const DropdownButton = useRef<any>();
  const [dropdownTop, setDropdownTop] = useState(100);
  const FavouriteButton = useRef<any>();

  const toggleDropdown = () => {
    visible ? setVisible(false) : openDropdown();
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

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={toggleDropdown}
      ref={DropdownButton}>
      <FontAwesomeIcon name="navicon" size={25} color={'black'} />
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}>
          <View ref={FavouriteButton}>
            <NavButton
              text="Favourites"
              navigationTarget="Favourites"
              style={[styles.dropdown, { top: dropdownTop }]}
            />
          </View>
          <View>
            <NavButton
              text="History"
              navigationTarget="History"
              style={[styles.dropdown, { top: dropdownTop }]}
            />
          </View>
          <View style={[styles.multiSelect, { top: dropdownTop }]}>
            <Filter
              setSelectedTypes={setSelectedTypes}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
              setSelectedFilterTypes={setSelectedFilterTypes}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
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
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  multiSelect: {
    backgroundColor: 'white',
    width: '100%',
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
    marginLeft: 10,
    paddingRight: 10,
    paddingLeft: 10,
    height: 80,
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
