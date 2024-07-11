import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import { SettingContainer } from './SettingContainer';
import { BodyText } from '../../components';
import { megaphone } from '../../assets/svg';
import { Theme, useTheme } from '../../styles';

export const ModeOfReading = () => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);

  return (
    <SettingContainer
      useButton
      buttonTitle="Notify Me"
      buttonIcon={<Ionicons name="notifications-outline" size={20} color={theme.colors.primary} />}
    >
      <View style={[utils.align_self_center, utils.align_items_center, utils.mt_5]}>
        <SvgXml xml={megaphone} />
        <View>
          <Text style={styles.coming}>Coming</Text>
          <Text style={[styles.soon, utils.mt_n1]}>Soon</Text>
          <BodyText style={styles.desc}>Stay tuned,companion mode would be launched soon.</BodyText>
        </View>
      </View>
    </SettingContainer>
  );
};

const createStyleSheet = (theme: Theme) => StyleSheet.create({
  coming: {
    fontSize: 50,
    textAlign: 'center'
  },
  soon: {
    fontSize: 50,
    textAlign: 'center',
    fontWeight: '800',
    color: theme.colors.primary
  },
  desc: {
    width: 200,
    textAlign: 'center',
    color: theme.colors.tertiaryText
  }
});
