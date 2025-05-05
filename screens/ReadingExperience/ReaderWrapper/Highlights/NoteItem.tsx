import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BodyTextSmall, PressableItem, TagText } from '../../../../components';
import { useReader } from '../../../../package/epub-reader';
import { Note } from '../../../../package/types';
import { Theme, useTheme } from '../../../../styles';
import { ICON_SIZE } from '../../../../utils';
import { ContextMenu } from '../ContextMenu';
import { ContextMenuType } from '../types';

import { getRelativeTime } from './utils';

type NoteItemProps = {
  index: number;
  note: Note;
  onDeleteNote?: () => void;
};

export const NoteItem = ({ index, note, onDeleteNote }: NoteItemProps) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const utils = theme.utilities;
  const { goToLocation } = useReader();
  const styles = createStyleSheet(theme);

  const options: ContextMenuType[] = [
    {
      label: 'Edit',
      icon: <Feather name="edit" size={ICON_SIZE} color={theme.colors.text} />,
      onPress: () => {}
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

        <View style={utils.mt_1}>
          <BodyTextSmall>{note.comment}</BodyTextSmall>
        </View>
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
    }
  });
