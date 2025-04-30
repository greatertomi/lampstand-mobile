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
    {icon && <View style={styles.iconWrapper}>{icon}</View>}
    <View style={styles.labelWrapper}>
      <BodyText>{label}</BodyText>
    </View>
  </PressableItem>
);

const styles = StyleSheet.create({
  menuItem: {
    width: 144,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4
  },
  iconWrapper: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  labelWrapper: {
    flex: 1,
    paddingLeft: 8
  }
});
