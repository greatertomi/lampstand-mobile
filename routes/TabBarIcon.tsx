import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { BodyText } from '../components';
import { Theme, useTheme } from '../styles';

interface TabBarIconProps {
  icon?: string;
  focused: boolean;
  screenName?: string;
}

export const TabBarIcon = ({ icon, focused, screenName }: TabBarIconProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  const changeIconColor = (xml: string): string => {
    if (!xml) return '';
    const color = focused ? theme.colors.white : theme.colors.iconDefaultColor;
    return xml.replaceAll(/stroke="[^"]+"/g, `stroke="${color}"`);
  };

  return (
    <View style={[styles.tabItem, focused && styles.focused]}>
      {icon && <SvgXml xml={changeIconColor(icon)} />}
      {focused && <BodyText variant="white">{screenName}</BodyText>}
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    tabItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4
    },
    focused: {
      backgroundColor: theme.colors.primary,
      borderRadius: 50,
      paddingHorizontal: 24,
      paddingVertical: 10
    }
  });
