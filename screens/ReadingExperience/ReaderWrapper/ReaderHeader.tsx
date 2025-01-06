import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { BodyTextSmall, PressableItem, ThreeDots } from '../../../components';
import { Theme, useTheme } from '../../../styles';

import { ReaderMenu } from './ReaderMenu';

type ReaderHeaderProps = {
  bookTitle: string;
};

export const ReaderHeader = ({ bookTitle }: ReaderHeaderProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const utils = theme.utilities;
  const navigation = useNavigation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={[utils.flex, utils.align_items_start]}>
          <PressableItem style={styles.rounded} onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={16} color={theme.colors.text} />
          </PressableItem>
        </View>

        <View style={[utils.flex, utils.align_items_center]}>
          <BodyTextSmall variant="secondary">{bookTitle}</BodyTextSmall>
        </View>

        <View
          style={[utils.flex, utils.flex_dir_row, utils.gap_2, utils.align_items_center, utils.justify_content_end]}
        >
          <PressableItem>
            <Feather name="bookmark" size={24} color={theme.colors.text} />
          </PressableItem>
          <PressableItem style={styles.rounded} onPress={() => setIsMenuOpen(!isMenuOpen)}>
            <ThreeDots vertical onPress={() => setIsMenuOpen(!isMenuOpen)} />
          </PressableItem>
        </View>
      </View>
      {isMenuOpen && <ReaderMenu />}
    </>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: 54,
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.background
    },
    rounded: {
      borderWidth: 1,
      borderRadius: 50,
      padding: 8,
      borderColor: theme.colors.tertiaryText
    }
  });
