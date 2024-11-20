import React, { ReactNode, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Theme, useTheme } from '../../../styles';
import { BodyText, BodyTextSmall, IconButton } from '../../../components';
import { ReadingModal } from './ReadingModal';

type ReadingWrapperProps = {
  children: ReactNode;
  bookTitle?: string;
  pageNumber?: string;
  totalPageNumber?: string;
};

export const ReaderWrapper = ({ children, bookTitle, pageNumber, totalPageNumber }: ReadingWrapperProps) => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);
  const navigation = useNavigation();
  const isFullScreen = false;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      {isFullScreen ? (
        <BodyTextSmall variant="secondary" style={[utils.align_self_center, utils.py_1]}>
          {bookTitle}
        </BodyTextSmall>
      ) : (
        <View style={[utils.p_2, utils.gap_1]}>
          <View style={styles.bookTitle}>
            <BodyText>{bookTitle}</BodyText>
            <AntDesign name="caretdown" size={12} color={theme.colors.text} />
          </View>
          <View style={styles.line} />
          <View style={[utils.flex_dir_row, utils.align_items_center, utils.justify_content_between]}>
            <IconButton onPress={() => navigation.goBack()}>
              <MaterialIcons name="keyboard-backspace" size={24} color={theme.colors.text} />
            </IconButton>
            <View style={[utils.flex_dir_row, utils.align_items_center, utils.gap_1]}>
              <BodyText>Aa</BodyText>
              <FontAwesome
                name={isOpen ? 'bookmark' : 'bookmark-o'}
                size={24}
                color={theme.colors.text}
                onPress={() => setIsOpen(!isOpen)}
              />
            </View>
          </View>
        </View>
      )}
      {children}
      <View style={[utils.align_self_center, utils.flex_dir_row, utils.p_3]}>
        <BodyTextSmall>{pageNumber}/</BodyTextSmall>
        <BodyTextSmall variant="secondary">{totalPageNumber}</BodyTextSmall>
      </View>
      <ReadingModal isVisible={isOpen} setIsVisible={() => setIsOpen(!isOpen)} />
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 56,
      backgroundColor: theme.colors.background
    },
    bookTitle: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4
    },
    line: {
      width: '100%',
      height: 1,
      backgroundColor: theme.colors.text
    }
  });
