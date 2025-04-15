import { ScrollView } from 'react-native';

import { TrackedState } from '../../../../package/epub-reader';

import { EmptyTab } from './EmptyTab';
import { HighlightedTextItem } from './HighlightedTextItem';

export const HighlightsAndNotes = ({ trackedState }: { trackedState: TrackedState | null }) => {
  // todo: spread both highlights and notes
  const notesAndHighlights = trackedState?.highlights || [];

  if (notesAndHighlights.length === 0) {
    return (
      <EmptyTab
        label="No Notes & Highlights"
        desc="You haven’t added any notes or highlights yet. Start marking important passages as you read"
      />
    );
  }

  const sortedNotesAndHighlight = notesAndHighlights.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <ScrollView>
      {sortedNotesAndHighlight.map((highlight, index) => (
        <HighlightedTextItem
          key={index}
          index={index}
          highlight={highlight}
          length={sortedNotesAndHighlight.length - 1}
        />
      ))}
    </ScrollView>
  );
};
