import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { TrackedState } from '../../../../package/epub-reader';
import { RouteNavigation } from '../../../../routes';
import { getBookState } from '../../../../store';
import { useTheme } from '../../../../styles';
import { logger } from '../../../../utils';
import { ReaderSettingsContainer } from '../ReaderSettingsContainer';

import { HighlightedTexts } from './HighlightedTexts';
import { HighlightsAndNotes } from './HighlightsAndNotes';
import { Notes } from './Notes';
import { Tag } from './Tag';

type Tabs = 'all' | 'highlight' | 'notes';

export const Highlights = () => {
  const route = useRoute<RouteNavigation<'Highlights'>>();
  const { theme } = useTheme();
  const utils = theme.utilities;
  const [trackedState, setTrackedState] = useState<TrackedState | null>(null);
  const { bookId } = route.params;

  const [activeTab, setActiveTab] = useState<Tabs>('all');

  useEffect(() => {
    setActiveTab('all');
    (async () => {
      try {
        const savedState = await getBookState(bookId);
        setTrackedState(savedState);
      } catch (error) {
        logger.error('Error fetching saved state:', error);
      }
    })();
  }, [bookId]);

  const tabs = {
    all: <HighlightsAndNotes trackedState={trackedState} />,
    highlight: <HighlightedTexts trackedState={trackedState} bookId={bookId} />,
    notes: <Notes />
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
