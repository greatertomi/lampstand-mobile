import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BodyTextSmall } from '../../../components';
import { useTheme } from '../../../styles';

type ReaderHeaderProps = {
  bookTitle: string;
  isFocusedState: boolean;
};

export const ReaderHeader = ({ bookTitle, isFocusedState }: ReaderHeaderProps) => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  return (
    <View style={styles.top}>
      <BodyTextSmall variant="secondary" style={styles.title}>
        {bookTitle}
      </BodyTextSmall>
      {!isFocusedState && (
        <MaterialIcons
          name="cancel"
          size={24}
          color={theme.colors.readerIconColor}
          style={styles.cancel}
          onPress={() => navigation.goBack()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6
  },
  title: {
    flexGrow: 1,
    textAlign: 'center'
  },
  cancel: {
    position: 'absolute',
    right: 24
  }
});
