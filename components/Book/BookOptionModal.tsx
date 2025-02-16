import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { deleteBook, markBookFinished, UploadedBook } from '../../store';
import { useTheme } from '../../styles';
import { ICON_SIZE, logger, processMimeType } from '../../utils';
import { ConfirmationModal, Dialog } from '../Dialog';
import { PreferenceList } from '../List';
import { BodyText, BodyTextSmall } from '../Typography';

import { BookCover } from './BookCover';

interface BookOptionModalProps extends Omit<UploadedBook, 'state' | 'size' | 'image'> {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

type BookOptionsState = {
  title: string;
  icon: React.JSX.Element;
  variant?: 'primary' | 'secondary';
  onPress?: () => void;
};

export const BookOptionModal = ({
  isOpen,
  setIsOpen,
  cover,
  title,
  author,
  filePath,
  mimeType,
  isFinished
}: BookOptionModalProps) => {
  const { theme } = useTheme();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isMarkComplete, setIsMarkComplete] = useState(false);
  const utils = theme.utilities;

  const shareBook = async () => {
    try {
      if (!filePath) return;

      const fileInfo = await FileSystem.getInfoAsync(filePath);
      if (fileInfo.exists) {
        const newFileName = `${title
          ?.replace(/[^\d\sa-z]/gi, '')
          .replaceAll(/([a-z])([A-Z])/g, '$1 $2')
          .toLowerCase()
          .replaceAll(/\s+/g, ' ')
          .trim()
          .replaceAll(/\b\w/g, (char) => char.toUpperCase())}.${processMimeType(mimeType)}`;

        const newFilePath = `${FileSystem.cacheDirectory}${newFileName}`;

        await FileSystem.copyAsync({
          from: filePath,
          to: newFilePath
        });

        await Sharing.shareAsync(newFilePath, {
          mimeType
        });

        await FileSystem.deleteAsync(newFilePath);
      }
    } catch (error) {
      logger.error('Error sharing book:', error);
    }
  };

  const bookOptions: BookOptionsState[] = [
    {
      title: 'Share',
      icon: <AntDesign name="sharealt" size={ICON_SIZE} color={theme.colors.text} />,
      onPress: () => shareBook()
    },
    ...(isFinished === 0
      ? [
        {
          title: 'Mark as finished',
          icon: <Ionicons name="checkmark-circle-outline" size={ICON_SIZE} color={theme.colors.text} />,
          onPress: () => setIsMarkComplete(!isMarkComplete)
        }
      ]
      : []),
    {
      title: 'Remove from Library',
      variant: 'primary',
      icon: <MaterialCommunityIcons name="delete-outline" size={ICON_SIZE} color={theme.colors.primary} />,
      onPress: () => setIsDeleteModal(!isDeleteModal)
    }
  ];

  const handleDeleting = async () => {
    await deleteBook(title, author);
    setIsOpen(!isOpen);
  };

  const handleMarkBookFinished = async () => {
    await markBookFinished(title, author);
    setIsOpen(!isOpen);
  };

  return (
    <Dialog modalHeight="50%" isOverlay isVisible={isOpen} onClose={() => setIsOpen(!isOpen)}>
      <>
        <View>
          <View style={styles.bookCover}>
            <BookCover cover={cover} />
          </View>
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
      </>
      {isDeleteModal && (
        <ConfirmationModal
          title="Remove from library"
          description="Do you really want to delete this book? This action cannot be undone."
          buttonTitle="Delete"
          onOkay={handleDeleting}
          onClose={() => {
            setIsDeleteModal(!isDeleteModal);
          }}
        />
      )}
      {isMarkComplete && (
        <ConfirmationModal
          title="Mark Finished"
          buttonTitle="Okay"
          description="Are you sure you want to mark this book as finished?"
          onClose={() => {
            setIsMarkComplete(!isMarkComplete);
            setIsOpen(!isOpen);
          }}
          onOkay={handleMarkBookFinished}
        />
      )}
    </Dialog>
  );
};

const styles = StyleSheet.create({
  bookCover: {
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
