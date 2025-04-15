import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity, ScrollView, Text, ViewStyle, SafeAreaView } from 'react-native';

import { BodyText, BodyTextSmall, PressableItem } from '../../../../components';
import { useReader } from '../../../../package/epub-reader';
import { Theme, useTheme } from '../../../../styles';

const highlightExcerpt = (text: string, term: string, highlightStyle: ViewStyle) => {
  if (!term) return <Text>{text}</Text>;

  const regex = new RegExp(`(${term})`, 'gi');
  const parts = text.split(regex);

  return (
    <Text>
      {parts.map((part, index) => {
        if (part.toLowerCase() === term.toLowerCase()) {
          return (
            <Text key={index} style={highlightStyle}>
              {part}
            </Text>
          );
        }
        return <Text key={index}>{part}</Text>;
      })}
    </Text>
  );
};

const SearchBook = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const styles = createStyleSheet(theme);
  const [searchTerm, setSearchTerm] = useState('');
  const { clearSearchResults, searchBook, goToLocation, isSearching, searchResults } = useReader();

  const handleClear = () => {
    setSearchTerm('');
    clearSearchResults();
  };

  const handleResultPress = (cfi: string) => {
    goToLocation(cfi);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <PressableItem
            onPress={() => {
              clearSearchResults();
              navigation.goBack();
            }}
          >
            <Feather name="arrow-left" size={24} color={theme.colors.text} />
          </PressableItem>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Search this book"
              placeholderTextColor={theme.colors.secondaryText}
              style={styles.textInput}
              numberOfLines={1}
              inputMode="search"
              cursorColor={theme.colors.primary}
              underlineColorAndroid="transparent"
              value={searchTerm}
              onChangeText={(text) => {
                setSearchTerm(text);
                if (text.length > 0) {
                  searchBook(text);
                } else {
                  clearSearchResults();
                }
              }}
            />
          </View>
          {searchTerm.length > 0 && (
            <TouchableOpacity onPress={handleClear}>
              <Feather name="x-circle" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          )}
        </View>
        {searchTerm.length === 0 ? (
          <BodyText style={styles.searchText}>Enter a word or phrase above</BodyText>
        ) : isSearching ? (
          <BodyText style={styles.searchText}>Searching...</BodyText>
        ) : // eslint-disable-next-line unicorn/no-nested-ternary
        searchResults.results.length === 0 ? (
          <BodyText style={styles.searchText}>No results found</BodyText>
        ) : (
          <ScrollView>
            {searchResults.results.map((result, index) => (
              <TouchableOpacity key={index} onPress={() => handleResultPress(result.cfi)} style={styles.resultItem}>
                <BodyText style={{ color: theme.colors.text }}>{result.section?.label || ''}</BodyText>
                <BodyTextSmall style={styles.resultText}>
                  {highlightExcerpt(result.excerpt, searchTerm, styles.resultHighlight)}
                </BodyTextSmall>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 16,
      backgroundColor: theme.colors.background
    },
    header: {
      flexDirection: 'row',
      marginTop: 32,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: `${theme.colors.searchLineColor}66`,
      paddingHorizontal: 16
    },
    textInput: {
      flex: 1,
      paddingLeft: 40,
      color: theme.colors.text,
      paddingBottom: 10
    },
    inputContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center'
    },
    searchText: {
      paddingTop: 20,
      textAlign: 'center'
    },
    resultText: {
      paddingTop: 5,
      color: theme.colors.readerIconColor,
      lineHeight: 20
    },
    resultHighlight: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.secondaryText,
      fontWeight: 'bold'
    },
    resultItem: {
      paddingVertical: 16,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: `${theme.colors.searchLineColor}66`,
      paddingHorizontal: 16
    }
  });
export default SearchBook;
