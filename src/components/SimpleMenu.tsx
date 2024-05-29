import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import React, { useRef, useState } from 'react';
import NavButton from './NavButton';

FontAwesomeIcon.loadFont();

export default function SimpleMenu() {
  const [visible, setVisible] = useState(false);
  const DropdownButton = useRef<any>();
  const [dropdownTop, setDropdownTop] = useState(100);

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
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={toggleDropdown}
        ref={DropdownButton}>
        <FontAwesomeIcon name="navicon" size={25} color={'black'} />
        <Modal
          visible={visible}
          transparent
          animationType="none"
          onRequestClose={() => {
            setVisible(false);
          }}>
          <TouchableOpacity
            style={styles.overlay}
            onPress={() => setVisible(false)}>
            <View>
              <NavButton
                text="Home"
                navigationTarget="Home"
                top={dropdownTop}
              />
            </View>
            <View>
              <NavButton text="Map" navigationTarget="Map" top={dropdownTop} />
            </View>
            <View>
              <NavButton
                text="Favourites"
                navigationTarget="Favourites"
                top={dropdownTop}
              />
            </View>
            <View>
              <NavButton
                text="History"
                navigationTarget="History"
                top={dropdownTop}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    paddingHorizontal: 10,
    zIndex: 1,
  },
  overlay: {
    width: '35%',
  },
});
