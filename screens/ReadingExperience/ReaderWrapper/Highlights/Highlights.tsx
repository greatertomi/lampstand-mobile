import Feather from '@expo/vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { HeadingSmall, PressableItem } from '../../../../components';
import { TrackedState } from '../../../../package/epub-reader';
import { RouteNavigation } from '../../../../routes';
import { getBookState } from '../../../../store';
import { Theme, useTheme } from '../../../../styles';
import { logger } from '../../../../utils';

import { HighlightedTexts } from './HighlightedTexts';
import { HighlightsAndNotes } from './HighlightsAndNotes';
import { Notes } from './Notes';
import { Tag } from './Tag';

type Tabs = 'all' | 'highlight' | 'notes';

export const Highlights = () => {
  const route = useRoute<RouteNavigation<'Highlights'>>();

  const navigation = useNavigation();
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);
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
    all: <HighlightsAndNotes />,
    highlight: <HighlightedTexts trackedState={trackedState} bookId={bookId} />,
    notes: <Notes />
  };

  const tags: { label: string; key: 'all' | 'highlight' | 'notes' }[] = [
    { label: 'All', key: 'all' },
    { label: 'Highlights', key: 'highlight' },
    { label: 'Notes', key: 'notes' }
  ];

  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <PressableItem onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color={theme.colors.text} />
          </PressableItem>
          <View style={utils.flex}>
            <HeadingSmall bold style={utils.ml_3}>
              Highlights
            </HeadingSmall>
          </View>
        </View>
        <View style={[utils.flex_dir_row, utils.gap_1, utils.mt_2]}>
          {tags.map((tag, index) => (
            <Tag key={index} isActive={activeTab === tag.key} onPress={() => setActiveTab(tag.key)}>
              {tag.label}
            </Tag>
          ))}
        </View>
      </View>
      <View style={utils.flex}>{tabs[activeTab]}</View>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background
    },
    container: {
      backgroundColor: theme.colors.cardBackground,
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 28
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 32,
      paddingVertical: 16
    }
  });
