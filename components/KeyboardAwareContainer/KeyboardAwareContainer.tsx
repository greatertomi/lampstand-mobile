import React, { ReactNode } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, ViewStyle } from 'react-native';

export const KeyboardAwareContainer = ({ children, style }: { children: ReactNode; style?: ViewStyle }) => (
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

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20
  }
});
