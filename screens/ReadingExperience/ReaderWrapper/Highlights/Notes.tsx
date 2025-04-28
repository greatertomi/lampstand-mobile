import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';

import { PressableItem } from '../../../../components';
import { useReader } from '../../../../package/epub-reader';
import { BookTrackedState, Note } from '../../../../package/types';
import { deleteNote } from '../../../../store';
import { useTheme } from '../../../../styles';

import { EmptyTab } from './EmptyTab';
import { NoteItem } from './NoteItem';

type NoteProps = {
  trackedState?: BookTrackedState;
  bookId: string;
};

export const Notes = ({ trackedState, bookId }: NoteProps) => {
  const { theme } = useTheme();
  const { goToLocation, removeNote } = useReader();
  const navigation = useNavigation();

  const handleDeleteNote = async (note: Note) => {
    removeNote(note);
    await deleteNote(bookId, note);
  };

  if (trackedState?.notes.length === 0) {
    return (
      <EmptyTab label="No Notes" desc="You haven’t added any notes yet. Start taking important notes as you read" />
    );
  }

  return (
    <ScrollView style={{ backgroundColor: theme.colors.background }}>
      {trackedState?.notes.map((note, index) => (
        <PressableItem
          onPress={() => {
            goToLocation(note.cfiRange);
            navigation.goBack();
          }}
          key={index}
        >
          <NoteItem key={index} index={index} note={note} onDeleteNote={() => handleDeleteNote(note)} />
        </PressableItem>
      ))}
    </ScrollView>
  );
};
