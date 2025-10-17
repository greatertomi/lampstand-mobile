import React, { ReactNode } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, ViewStyle } from 'react-native';

import { Theme, useTheme } from '../../styles';

export const KeyboardAwareContainer = ({ children, style }: { children: ReactNode; style?: ViewStyle }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <SafeAreaView style={[styles.container, style]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    contentContainer: {
      flexGrow: 1,
      paddingBottom: 20
    }
  });
