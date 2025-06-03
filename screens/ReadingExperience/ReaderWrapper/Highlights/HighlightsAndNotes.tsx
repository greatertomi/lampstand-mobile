import { ScrollView } from 'react-native';

import { useReader } from '../../../../package/epub-reader';
import { BookTrackedState, Highlight, Note } from '../../../../package/types';
import { deleteHighlightedText, deleteNote } from '../../../../store';

import { EmptyTab } from './EmptyTab';
import { HighlightedTextItem } from './HighlightedTextItem';
import { NoteItem } from './NoteItem';

export const HighlightsAndNotes = ({ trackedState, bookId }: { trackedState?: BookTrackedState; bookId: string }) => {
  const notesAndHighlights: (Note | Highlight)[] = [
    ...(trackedState?.notes ?? []),
    ...(trackedState?.highlights ?? [])
  ];
  const { removeNote, removeHighlight } = useReader();

  if (notesAndHighlights.length === 0) {
    return (
      <EmptyTab
        label="No Notes & Highlights"
        desc="You haven't added any notes or highlights yet. Start marking important passages as you read"
      />
    );
  }

  const sortedNotesAndHighlight = notesAndHighlights.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const handleDeleteNote = async (note: Note) => {
    removeNote(note);
    await deleteNote(bookId, note);
  };

  const handleDeleteHighlight = async (highlight: Highlight) => {
    removeHighlight(highlight.cfiRange, highlight.text);
    await deleteHighlightedText(bookId, highlight.id);
  };

  return (
    <ScrollView>
      {sortedNotesAndHighlight.map((item, index) => {
        const hasComment = 'comment' in item && item.comment;

        return hasComment ? (
          <NoteItem
            key={(item as Note).id}
            index={index}
            note={item as Note}
            bookId={bookId}
            onDeleteNote={() => handleDeleteNote(item as Note)}
          />
        ) : (
          <HighlightedTextItem
            key={(item as Highlight).id}
            index={index}
            highlight={item as Highlight}
            length={sortedNotesAndHighlight.length - 1}
            onDeleteHighlight={() => handleDeleteHighlight(item as Highlight)}
          />
        );
      })}
    </ScrollView>
  );
};
