import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { BodyText, BodyTextSmall } from '../../components';
import { Theme, useTheme } from '../../styles';

const rules = ['8  Characters', '1  Number', '1  Special Character', '1  Upper case'];

export const PasswordRules = () => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStylesheet(theme);

  return (
    <View>
      <BodyText>Set up a strong password with at least</BodyText>
      {rules.map((rule, index) => (
        <View key={index} style={[utils.flex_dir_row, utils.align_items_center]}>
          <Entypo name="dot-single" size={20} color={theme.colors.text} />
          <BodyTextSmall style={styles.textColor}>{rule}</BodyTextSmall>
        </View>
      ))}
    </View>
  );
};

const createStylesheet = (theme: Theme) => StyleSheet.create({
  textColor: {
    color: theme.colors.passwordRule
  }
});
