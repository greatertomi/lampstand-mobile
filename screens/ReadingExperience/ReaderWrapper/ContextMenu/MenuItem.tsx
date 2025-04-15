import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { BodyText, PressableItem } from '../../../../components';

type MenuItemProps = {
  icon?: ReactNode;
  label: string;
  onPress: () => void;
};

export const MenuItem = ({ icon, label, onPress }: MenuItemProps) => (
  <PressableItem onPress={onPress} style={styles.menuItem}>
    {icon && <View>{icon}</View>}
    <BodyText>{label}</BodyText>
  </PressableItem>
);

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 4
  }
});
