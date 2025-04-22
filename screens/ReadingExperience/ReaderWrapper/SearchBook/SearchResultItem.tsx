import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

import { BodyText, BodyTextSmall } from '../../../../components';
import { SearchResult } from '../../../../package/epub-reader';
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
    <TouchableOpacity onPress={onPress} style={styles.resultItem}>
      <BodyText>{result.section?.label || ''}</BodyText>
      <BodyTextSmall variant="tertiary" style={styles.resultText}>
        {highlightExcerpt(result.excerpt, searchTerm, styles.resultHighlight)}
      </BodyTextSmall>
    </TouchableOpacity>
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
      paddingHorizontal: 16
    }
  });

export default SearchResultItem;
