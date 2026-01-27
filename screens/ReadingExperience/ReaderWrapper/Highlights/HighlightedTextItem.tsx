import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BodyText, PressableItem, TagText } from '../../../../components';
import { useReader } from '../../../../packages/epub-reader';
import { Highlight } from '../../../../packages/types';
import { Theme, useTheme } from '../../../../styles';
import { ICON_SIZE } from '../../../../utils';
import { ContextMenu } from '../ContextMenu';
import { ContextMenuType } from '../types';

import { formatTimestamp } from './utils';

type HighlightedTextItem = {
  index: number;
  length: number;
  highlight: Highlight;
  onDeleteHighlight?: () => void;
};

export const HighlightedTextItem = ({ index, length, highlight, onDeleteHighlight }: HighlightedTextItem) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { goToLocation } = useReader();
  const styles = createStyleSheet(theme);

  const options: ContextMenuType[] = [
    {
      label: 'Delete',
      icon: <MaterialCommunityIcons name="delete-outline" size={ICON_SIZE} color={theme.colors.primary} />,
      onPress: onDeleteHighlight
    }
  ];

  return (
    <PressableItem
      key={index}
      style={[styles.frame, index !== length && styles.underline]}
      onPress={() => {
        goToLocation(highlight.cfiRange);
        navigation.goBack();
      }}
    >
      <View style={styles.textContainer}>
        <BodyText
          bold
          style={[styles.highlightText, { backgroundColor: highlight.colour }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {highlight.text}
        </BodyText>
        <TagText style={styles.date}>{formatTimestamp(highlight.id)}</TagText>
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
      paddingVertical: 13,
      marginVertical: 4
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center',
      marginRight: 24,
      paddingRight: 16
    },
    highlightText: {
      padding: 2,
      flexShrink: 1
    },
    underline: {
      borderBottomColor: theme.colors.inactiveButtonColor,
      borderBottomWidth: 1
    },
    date: {
      color: theme.colors.secondaryText,
      marginTop: 4
    }
  });
