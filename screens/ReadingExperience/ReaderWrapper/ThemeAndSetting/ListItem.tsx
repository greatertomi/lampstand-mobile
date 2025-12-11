import { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

import { BodyText, BodyTextLarge } from '../../../../components';
import { Theme, useTheme } from '../../../../styles';

export type ListItemProps = {
  heading: string;
  list: {
    icon?: string;
    label: string;
    rightElement?: ReactNode;
  }[];
};

export const ListItem = ({ heading, list }: ListItemProps) => {
  const { theme } = useTheme();
  const styles = createStylesheet(theme);
  const utils = theme.utilities;

  return (
    <View style={styles.wrapper}>
      <BodyTextLarge style={[utils.mb_1]} bold>
        {heading}
      </BodyTextLarge>

      {list.map(({ icon, label, rightElement }, index) => {
        const isLastItem = index === list.length - 1;

        return (
          <View key={label} style={[styles.itemRow, !isLastItem && styles.itemDivider]}>
            <View style={[utils.flex_dir_row, utils.align_items_center, utils.pb_1]}>
              {icon && <BodyText bold>{icon}</BodyText>}
              <BodyText style={[utils.ml_2]}>{label}</BodyText>
            </View>

            <View style={utils.pb_1}>{rightElement}</View>
          </View>
        );
      })}
    </View>
  );
};

const createStylesheet = (theme: Theme) =>
  StyleSheet.create({
    wrapper: {
      padding: 20,
      borderRadius: 10,
      backgroundColor: theme.colors.cardBackground
    },

    itemRow: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },

    itemDivider: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.text,
      paddingVertical: 12,
      marginBottom: 12
    }
  });
