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

  const handleDeleteHighlight = async (highlight: Highlight) => {
    removeHighlight(highlight.cfiRange, highlight.text);
    deleteHighlightedText(bookId, highlight.id);
  };

  if ((trackedState?.highlights?.length ?? 0) === 0) {
    return (
      <EmptyTab
        label="No Highlights"
        desc="No highlights found. Save important passages to revisit your favourite moments!"
      />
    );
  }

  return (
    <ScrollView style={{ backgroundColor: theme.colors.background }}>
      {trackedState?.highlights.map((highlight, index) => (
        <HighlightedTextItem
          key={`highlight-${highlight.id}`}
          index={index}
          highlight={highlight}
          length={(trackedState?.highlights?.length ?? 0) - 1}
          onDeleteHighlight={() => handleDeleteHighlight(highlight)}
        />
      ))}
    </ScrollView>
  );
};
