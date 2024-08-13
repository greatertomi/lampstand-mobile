import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { BodyText, TagText } from '../../components';
import { Theme, useTheme } from '../../styles';

export const BookToast = () => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return (
    <View style={styles.container}>
      <View>
        <BodyText bold>Books added to Library !</BodyText>
        <TagText variant="secondary">Now you can read books at your convince.</TagText>
      </View>
      <Pressable>
        <FontAwesome5 name="times-circle" size={24} color={theme.colors.text} />
      </Pressable>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      height: 66,
      width: '100%',
      borderRadius: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 12,
      borderTopWidth: 10,
      borderTopColor: theme.colors.success,
      elevation: 4
    }
  });
