import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';

import { BodyText, BodyTextSmall, PressableItem } from '../../../../components';
import { useReader } from '../../../../package/epub-reader';
import { Theme, useTheme } from '../../../../styles';

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

  // only using this to test as this is the only way the result will show up, not permanent!
  const handleBlur = () => {
    if (searchTerm.length > 0) {
      searchBook(searchTerm);
    } else {
      clearSearchResults();
    }
  };

  // useEffect(() => {
  //   if (searchTerm.length > 0) {
  //     console.log('Search term updated:', searchTerm);
  //     searchBook(searchTerm);
  //   } else {
  //     clearSearchResults();
  //   }
  // }, [searchTerm, clearSearchResults]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <PressableItem onPress={() => navigation.goBack()}>
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
            // selectionColor={`${theme.colors.primary}33`}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            onBlur={handleBlur}
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
        <View style={styles.resultsContainer}>
          {searchResults.results.map((result, index) => (
            <TouchableOpacity key={index} onPress={() => handleResultPress(result.cfi)} style={styles.resultItem}>
              <BodyText style={{ color: theme.colors.text }}>{result.section?.label || 'Unknown Chapter'}</BodyText>
              <BodyTextSmall style={styles.resultText}>{result.excerpt}</BodyTextSmall>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 16,
      backgroundColor: theme.colors.background
    },
    header: {
      flexDirection: 'row',
      // alignItems: 'center',
      marginTop: 32,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: `${theme.colors.searchLineColor}66`,
      marginHorizontal: -16,
      paddingHorizontal: 16
      // paddingBottom: 17,
      // alignItems: 'center'
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
    resultsContainer: {
      paddingTop: 16,
      paddingBottom: 20,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: `${theme.colors.searchLineColor}66`,
      marginHorizontal: -16,
      paddingHorizontal: 16
    },
    resultText: {
      paddingTop: 5,
      color: theme.colors.secondaryText,
      lineHeight: 20
    },
    resultHighlight: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.secondaryText,
      fontWeight: 'bold'
    },
    resultItem: {
      marginBottom: 16
    }
  });
export default SearchBook;
