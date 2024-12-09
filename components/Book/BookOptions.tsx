import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { Dispatch, SetStateAction } from 'react';
import { Image, Modal, Pressable, StyleSheet, View } from 'react-native';

import { deleteBook } from '../../store';
import { Theme, useTheme } from '../../styles';
import { PreferenceList } from '../List';
import { BodyText, BodyTextSmall } from '../Typography';

import { EmptyBookCover } from './EmptyBookCover';

interface BookOptionsProps {
  title?: string;
  bookCover: string | null;
  author?: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

type BookOptionsState = {
  title: string;
  icon: React.JSX.Element;
  variant?: 'primary' | 'secondary';
  onPress?: () => void;
};

export const BookOptions = ({ isOpen, setIsOpen, bookCover, title, author }: BookOptionsProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const utils = theme.utilities;
  const ICON_SIZE = 25;

  const bookOptions: BookOptionsState[] = [
    {
      title: 'Share',
      icon: <AntDesign name="sharealt" size={ICON_SIZE} color={theme.colors.text} />
    },
    {
      title: 'Mark complete',
      icon: <Ionicons name="checkmark-circle-outline" size={ICON_SIZE} color={theme.colors.text} />
    },
    {
      title: 'Remove from Library',
      variant: 'primary',
      icon: <MaterialCommunityIcons name="delete-outline" size={ICON_SIZE} color={theme.colors.primary} />,
      onPress: () => {
        setIsOpen(!isOpen);
        deleteBook(title, author);
      }
    }
  ];

  return (
    <Modal animationType="slide" transparent visible={isOpen}>
      <Pressable style={styles.overlay} onPress={() => setIsOpen(!isOpen)} />
      <View style={styles.modalContent}>
        <Pressable onPress={() => setIsOpen(!isOpen)}>
          <View style={styles.line} />
        </Pressable>
        <View style={utils.mt_3}>
          {bookCover ? <Image source={{ uri: bookCover }} style={styles.image} /> : <EmptyBookCover />}
          <BodyText numberOfLines={1} ellipsizeMode="tail" bold style={[utils.text_center, utils.mt_2]}>
            {title}
          </BodyText>
          <BodyTextSmall style={[utils.text_center, styles.author]} variant="secondary">
            by {author}
          </BodyTextSmall>
        </View>

        <View>
          {bookOptions.map((bookOption, index) => (
            <PreferenceList
              key={index}
              hasLeftIcon
              leftIcon={bookOption.icon}
              title={bookOption.title}
              isPressable
              variant={bookOption.variant}
              hasUnderline={index !== bookOptions.length - 1}
              onPress={bookOption.onPress}
            />
          ))}
        </View>
      </View>
    </Modal>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: theme.colors.overlayBackground
    },
    modalContent: {
      height: '52%',
      width: '100%',
      position: 'absolute',
      bottom: 0,
      backgroundColor: theme.colors.background,
      paddingHorizontal: 16,
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
      gap: 16
    },
    line: {
      width: 80,
      height: 5,
      marginTop: 15,
      alignSelf: 'center',
      borderRadius: 10,
      backgroundColor: theme.colors.secondaryText
    },
    image: {
      width: 115,
      height: 160,
      resizeMode: 'stretch',
      borderRadius: 5,
      alignSelf: 'center'
    },
    author: {
      marginTop: 3
    }
  });
