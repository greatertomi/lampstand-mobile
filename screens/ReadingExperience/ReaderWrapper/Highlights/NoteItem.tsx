import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  BodyTextSmall,
  PressableItem,
  PrimaryButton,
  SecondaryButton,
  TagText,
  TextAreaField
} from '../../../../components';
import { useReader } from '../../../../packages/epub-reader';
import { Note } from '../../../../packages/types';
import { editNote } from '../../../../store';
import { Theme, useTheme } from '../../../../styles';
import { ICON_SIZE } from '../../../../utils';
import { ContextMenu } from '../ContextMenu';
import { ContextMenuType } from '../types';

import { getRelativeTime } from './utils';

type NoteItemProps = {
  bookId: string;
  index: number;
  note: Note;
  onDeleteNote?: () => void;
};

export const NoteItem = ({ index, bookId, note, onDeleteNote }: NoteItemProps) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const utils = theme.utilities;
  const { goToLocation } = useReader();
  const styles = createStyleSheet(theme);
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState(note.comment);

  const options: ContextMenuType[] = [
    {
      label: 'Edit',
      icon: <Feather name="edit" size={ICON_SIZE} color={theme.colors.text} />,
      onPress: () => setIsEditing(true)
    },
    {
      label: 'Share',
      icon: <AntDesign name="sharealt" size={ICON_SIZE} color={theme.colors.text} />,
      onPress: () => {}
    },
    {
      label: 'Delete',
      icon: <MaterialCommunityIcons name="delete-outline" size={ICON_SIZE} color={theme.colors.primary} />,
      onPress: onDeleteNote
    }
  ];

  const handleEditNote = async () => {
    const values = { ...note, comment };
    editNote(bookId, values);
    setIsEditing(false);
  };

  return (
    <PressableItem
      key={index}
      style={styles.frame}
      onPress={() => {
        goToLocation(note.cfiRange);
        navigation.goBack();
      }}
    >
      <View style={styles.textContainer}>
        <View style={styles.text}>
          <BodyTextSmall>&quot; {note.text} &quot;</BodyTextSmall>
        </View>
        <TagText style={styles.date}>{getRelativeTime(Number(note.createdAt))}</TagText>

        {isEditing ? (
          <View style={styles.editor}>
            <TextAreaField
              value={comment}
              onChangeText={(text) => setComment(text)}
              cursorColor={theme.colors.primary}
              style={[utils.mt_n5]}
            />
            {comment !== note.comment && (
              <View style={[utils.flex_dir_row, utils.gap_1, utils.justify_content_end]}>
                <SecondaryButton title="Cancel" style={utils.width_25} onPress={() => setIsEditing(false)} />
                <PrimaryButton title="Save" style={utils.width_25} onPress={handleEditNote} />
              </View>
            )}
          </View>
        ) : (
          <View style={utils.mt_1}>
            <BodyTextSmall>{comment}</BodyTextSmall>
          </View>
        )}
      </View>
      <ContextMenu items={options} />
    </PressableItem>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    frame: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 13
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingRight: 12
    },
    date: {
      color: theme.colors.secondaryText,
      marginTop: 4
    },
    text: {
      paddingHorizontal: 8,
      marginVertical: 8,
      textAlign: 'justify',
      borderLeftColor: theme.colors.text,
      borderLeftWidth: 2
    },
    editor: {
      padding: 8,
      marginTop: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 16
    }
  });
