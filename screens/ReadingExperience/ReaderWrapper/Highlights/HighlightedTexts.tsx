import { useState } from 'react';
import { ScrollView } from 'react-native';

import { useReader } from '../../../../package/epub-reader';
import { BookTrackedState, Highlight } from '../../../../package/types';
import { deleteHighlightedText } from '../../../../store';
import { useTheme } from '../../../../styles';

import { EmptyTab } from './EmptyTab';
import { HighlightedTextItem } from './HighlightedTextItem';

type HighlightedTextsProps = {
  trackedState?: BookTrackedState;
  bookId: string;
};

export const HighlightedTexts = ({ trackedState, bookId }: HighlightedTextsProps) => {
  const { theme } = useTheme();
  const { removeHighlight } = useReader();
  const [allHighlights, setAllHighlights] = useState(trackedState?.highlights || []);

  const handleDeleteHighlight = async (highlight: Highlight) => {
    setAllHighlights((highlights) => highlights.filter((item) => item.id !== highlight.id));
    removeHighlight(highlight.cfiRange, highlight.text);
    await deleteHighlightedText(bookId, highlight.id);
  };

  if (allHighlights.length === 0) {
    return (
      <EmptyTab
        label="No Highlights"
        desc="No highlights found. Save important passages to revisit your favourite moments!"
      />
    );
  }

  return (
    <ScrollView style={{ backgroundColor: theme.colors.background }}>
      {allHighlights.map((highlight, index) => (
        <HighlightedTextItem
          key={index}
          index={index}
          highlight={highlight}
          length={allHighlights.length - 1}
          onDeleteHighlight={() => handleDeleteHighlight(highlight)}
        />
      ))}
    </ScrollView>
  );
};
