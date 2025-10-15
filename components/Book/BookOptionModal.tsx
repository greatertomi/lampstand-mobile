import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import useSWRMutation from 'swr/mutation';

import { apiService, endpoints } from '../../api';
import { deleteBook, markBookFinished, UploadedBook, useAuthState } from '../../store';
import { useTheme } from '../../styles';
import { ICON_SIZE, logger, processMimeType, resolveBookPath } from '../../utils';
import { BottomSheet } from '../BottomSheet';
import { ConfirmationDialog } from '../Dialog';
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
  id,
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
  const { isAuthenticated } = useAuthState();
  const utils = theme.utilities;

  const { trigger: handleDelete } = useSWRMutation(endpoints.deleteBook, async (url, { arg }: { arg: string }) => {
    const response = await apiService.delete(`${url}/${arg}`);
    return response.data;
  });

  const shareBook = async () => {
    try {
      if (!filePath) return;

      // Resolve the file path (convert relative to absolute if needed)
      const resolvedFilePath = await resolveBookPath(filePath);
      const fileInfo = await FileSystem.getInfoAsync(resolvedFilePath);
      if (fileInfo.exists) {
        const newFileName = `${title
          ?.replace(/[^\d\sa-z]/gi, '')
          .replaceAll(/([a-z])([A-Z])/g, '$1 $2')
          .toLowerCase()
          .replaceAll(/\s+/g, ' ')
          .trim()
          .replaceAll(/\b\w/g, (char: string) => char.toUpperCase())}.${processMimeType(mimeType)}`;

        const newFilePath = `${FileSystem.cacheDirectory}${newFileName}`;

        await FileSystem.copyAsync({
          from: resolvedFilePath,
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
            title: 'Mark as completed',
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
    try {
      deleteBook(id);
      setIsOpen(!isOpen);
      if (isAuthenticated) {
        await handleDelete(id);
      }
    } catch (error) {
      logger.error('Error deleting book:', error);
    }
  };

  const handleMarkBookFinished = async () => {
    markBookFinished(id);
    setIsOpen(!isOpen);
  };

  return (
    <BottomSheet isVisible={isOpen} onClose={() => setIsOpen(!isOpen)} snapPoints={['60%']}>
      <>
        <View>
          <View style={styles.bookCover}>
            <BookCover cover={cover} />
          </View>
          <BodyText numberOfLines={1} ellipsizeMode="tail" bold style={[utils.text_center, utils.mt_4]}>
            {title}
          </BodyText>
          <BodyTextSmall style={[utils.text_center, styles.author]} variant="secondary">
            by {author}
          </BodyTextSmall>
        </View>
        <View style={utils.width_100}>
          {bookOptions.map((bookOption, index) => (
            <PreferenceList
              key={index}
              hasLeftIcon
              leftIcon={bookOption.icon}
              title={bookOption.title}
              variant={bookOption.variant}
              hasUnderline={index !== bookOptions.length - 1}
              onPress={bookOption.onPress}
            />
          ))}
        </View>
      </>
      {isDeleteModal && (
        <ConfirmationDialog
          title="Remove from library"
          description="Do you really want to delete this book? This action cannot be undone."
          okayButtonText="Yes"
          onOkay={handleDeleting}
          onClose={() => {
            setIsDeleteModal(!isDeleteModal);
          }}
        />
      )}
      {isMarkComplete && (
        <ConfirmationDialog
          title="Mark Finished"
          okayButtonText="Okay"
          description="Are you sure you want to mark this book as finished?"
          onClose={() => {
            setIsMarkComplete(!isMarkComplete);
            setIsOpen(!isOpen);
          }}
          onOkay={handleMarkBookFinished}
        />
      )}
    </BottomSheet>
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
