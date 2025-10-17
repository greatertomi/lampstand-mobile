import React from 'react';
import { StyleSheet, Text, ViewStyle } from 'react-native';

import { BodyText, BodyTextSmall, PressableItem } from '../../../../components';
import { SearchResult } from '../../../../package/types';
import { Theme, useTheme } from '../../../../styles';

type SearchResultItemProp = {
  searchTerm: string;
  result: SearchResult;
  onPress: () => void;
};

const highlightExcerpt = (text: string, term: string, highlightStyle: ViewStyle) => {
  if (!term) return <Text>{text}</Text>;

  const regex = new RegExp(`(${term})`, 'gi');
  const parts = text.split(regex);

  return (
    <Text>
      {parts.map((part, index) => {
        if (part.toLowerCase() === term.toLowerCase()) {
          return (
            <BodyTextSmall variant="secondary" key={index} style={highlightStyle}>
              {part}
            </BodyTextSmall>
          );
        }
        return <Text key={index}>{part}</Text>;
      })}
    </Text>
  );
};

const SearchResultItem = ({ result, onPress, searchTerm }: SearchResultItemProp) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return (
    <PressableItem
      onPress={onPress}
      style={styles.resultItem}
      hitSlop={{ top: 2, bottom: 2, left: 2, right: 2 }}
    >
      <BodyText>{result.section?.label || ''}</BodyText>
      <BodyTextSmall variant="tertiary" style={styles.resultText}>
        {highlightExcerpt(result.excerpt, searchTerm, styles.resultHighlight)}
      </BodyTextSmall>
    </PressableItem>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    resultText: {
      paddingTop: 5,
      lineHeight: 20
    },
    resultHighlight: {
      backgroundColor: theme.colors.primary,
      fontWeight: 'bold'
    },
    resultItem: {
      paddingVertical: 16,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: `${theme.colors.searchLineColor}66`,
      paddingHorizontal: 16,
      minHeight: 60 // Ensure adequate touch target size
    }
  });

export default SearchResultItem;
