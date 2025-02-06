import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BodyText, BodyTextSmall, PressableItem, ThreeDots } from '../../../../components';
import { useReader } from '../../../../package/epub-reader';
import { Theme, useTheme } from '../../../../styles';

interface BookmarkItemProps {
  cfi: string;
  label: string;
  createdAt: string;
}

export const BookmarkItem = ({ cfi, label, createdAt }: BookmarkItemProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const { goToLocation } = useReader();
  const navigation = useNavigation();

  return (
    <View style={styles.sort}>
      <PressableItem
        style={styles.row}
        onPress={() => {
          goToLocation(cfi);
          navigation.goBack();
        }}
      >
        <View>
          <BodyText style={styles.bookmark}>{label}</BodyText>
          <BodyTextSmall variant="secondary">{createdAt}</BodyTextSmall>
        </View>
        <ThreeDots vertical />
      </PressableItem>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    sort: {
      borderBottomColor: theme.colors.secondaryText,
      borderBottomWidth: 0.2,
      paddingVertical: 16,
      position: 'relative'
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    bookmark: {
      marginBottom: 5
    }
  });
