import { ScrollView } from 'react-native';

import { BookTrackedState, Highlight, Note } from '../../../../package/types';

import { EmptyTab } from './EmptyTab';
import { HighlightedTextItem } from './HighlightedTextItem';
import { NoteItem } from './NoteItem';

export const HighlightsAndNotes = ({ trackedState }: { trackedState?: BookTrackedState }) => {
  const notesAndHighlights: (Note | Highlight)[] = [
    ...(trackedState?.notes ?? []),
    ...(trackedState?.highlights ?? [])
  ];

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

  return (
    <ScrollView>
      {sortedNotesAndHighlight.map((item, index) => {
        const hasComment = 'comment' in item && item.comment;

        return hasComment ? (
          <NoteItem key={index} index={index} note={item as Note} />
        ) : (
          <HighlightedTextItem
            key={index}
            index={index}
            highlight={item as Highlight}
            length={sortedNotesAndHighlight.length - 1}
          />
        );
      })}
    </ScrollView>
  );
};
