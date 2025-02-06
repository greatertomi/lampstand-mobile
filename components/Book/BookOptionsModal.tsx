import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { deleteBook, toggleBookCompletion, UploadedBook } from '../../store';
import { useTheme } from '../../styles';
import { ICON_SIZE } from '../../utils';
import { Dialog } from '../Dialog';
import { PreferenceList } from '../List';
import { BodyText, BodyTextSmall } from '../Typography';

import { BookAlertModal } from './BookAlertModal';
import { BookCover } from './BookCover';

interface BookOptionsProps extends Pick<UploadedBook, 'title' | 'author' | 'cover' | 'progress'> {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

type BookOptionsState = {
  title: string;
  icon: React.JSX.Element;
  variant?: 'primary' | 'secondary';
  onPress?: () => void;
};

export const BookOptionsModal = ({ isOpen, setIsOpen, cover, title, author, progress }: BookOptionsProps) => {
  const { theme } = useTheme();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isMarkComplete, setIsMarkComplete] = useState(false);
  const utils = theme.utilities;
  const text = progress === 1 ? 'incomplete' : 'complete';

  const bookOptions: BookOptionsState[] = [
    {
      title: 'Share',
      icon: <AntDesign name="sharealt" size={ICON_SIZE} color={theme.colors.text} />
    },
    {
      title: `Mark ${text}`,
      icon: <Ionicons name="checkmark-circle-outline" size={ICON_SIZE} color={theme.colors.text} />,
      onPress: () => setIsMarkComplete(!isMarkComplete)
    },
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

  const handleMarkComplete = async () => {
    await toggleBookCompletion(title, author);
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
        <BookAlertModal
          title="Remove from library"
          description="Do you really want to delete this book? This action cannot be undone."
          buttonTitle="Delete"
          onOkay={handleDeleting}
          onClose={() => setIsDeleteModal(!isDeleteModal)}
          closeBookOption={() => setIsOpen(!isOpen)}
        />
      )}
      {isMarkComplete && (
        <BookAlertModal
          title={`Mark ${text}`}
          buttonTitle="Okay"
          description={`Are you sure you want to mark this book as ${text}?`}
          onClose={() => setIsMarkComplete(!isMarkComplete)}
          onOkay={handleMarkComplete}
          closeBookOption={() => setIsOpen(!isOpen)}
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
