import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { useBooks } from '../../../../context';
import { RouteNavigation } from '../../../../routes';
import { useTheme } from '../../../../styles';
import { ReaderSettingsContainer } from '../ReaderSettingsContainer';

import { HighlightedTexts } from './HighlightedTexts';
import { HighlightsAndNotes } from './HighlightsAndNotes';
import { Notes } from './Notes';
import { Tag } from './Tag';

type Tabs = 'all' | 'highlight' | 'notes';

export const Highlights = () => {
  const route = useRoute<RouteNavigation<'Highlights'>>();
  const { theme } = useTheme();
  const { books } = useBooks();
  const utils = theme.utilities;
  const { state: bookTrackedState } = books.find((book) => book.id === bookId) || {};
  const { bookId } = route.params;

  const [activeTab, setActiveTab] = useState<Tabs>('all');

  useEffect(() => {
    setActiveTab('all');
  }, [bookId]);

  const tabs = {
    all: <HighlightsAndNotes trackedState={bookTrackedState} />,
    highlight: <HighlightedTexts trackedState={bookTrackedState} bookId={bookId} />,
    notes: <Notes trackedState={bookTrackedState} bookId={bookId} />
  };

  const tags: { label: string; key: Tabs }[] = [
    { label: 'All', key: 'all' },
    { label: 'Highlights', key: 'highlight' },
    { label: 'Notes', key: 'notes' }
  ];

  return (
    <ReaderSettingsContainer title="Highlights">
      <View style={[utils.flex_dir_row, utils.gap_1, utils.p_2]}>
        {tags.map((tag, index) => (
          <Tag key={index} isActive={activeTab === tag.key} onPress={() => setActiveTab(tag.key)}>
            {tag.label}
          </Tag>
        ))}
      </View>
      <View style={utils.flex}>{tabs[activeTab]}</View>
    </ReaderSettingsContainer>
  );
};
