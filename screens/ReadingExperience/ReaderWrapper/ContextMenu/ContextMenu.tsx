import { useState } from 'react';
import {
  Modal,
  NativeSyntheticEvent,
  NativeTouchEvent,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from 'react-native';

import { ThreeDots } from '../../../../components';
import { Theme, useTheme } from '../../../../styles';
import { ContextMenuType } from '../types';

import { MenuItem } from './MenuItem';

interface ContextMenuProps {
  items: ContextMenuType[];
}

export const ContextMenu = ({ items }: ContextMenuProps) => {
  const { theme } = useTheme();
  const styles = createStylesheet(theme);
  const [isActive, setIsActive] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });

  const handlePress = (event: NativeSyntheticEvent<NativeTouchEvent>) => {
    const { pageY } = event.nativeEvent;
    const top = pageY + 10;
    const right = 16;
    setMenuPosition({ top, right });
    setIsActive((prev) => !prev);
  };

  const handleClose = () => setIsActive(false);

  return (
    <>
      <ThreeDots vertical onPress={handlePress} />
      <Modal visible={isActive} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.overlay}>
            <View style={[styles.menu, { top: menuPosition.top, right: menuPosition.right }]}>
              {items.map((item, index) => (
                <MenuItem
                  key={index}
                  label={item.label}
                  onPress={() => {
                    item.onPress?.();
                    handleClose();
                  }}
                  icon={item.icon}
                />
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const createStylesheet = (theme: Theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1
    },
    menu: {
      position: 'absolute',
      backgroundColor: theme.colors.cardBackground,
      borderRadius: 10,
      gap: 16,
      padding: 10,
      elevation: 5,
      shadowColor: theme.colors.text,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1
    }
  });
