import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import debounce from 'lodash/debounce';
import React, { useMemo, useState } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Keyboard } from 'react-native';

import { BodyText, PressableItem } from '../../../../components';
import { useReader } from '../../../../package/epub-reader';
import { Theme, useTheme } from '../../../../styles';

import SearchResultItem from './SearchResultItem';

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
    Keyboard.dismiss();
    goToLocation(cfi);
    navigation.goBack();
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((text: string) => {
        if (text.length >= 3) {
          searchBook(text);
        } else {
          clearSearchResults();
        }
      }, 300),
    [searchBook, clearSearchResults]
  );

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
                debouncedSearch(text);
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
          <FlatList
            data={searchResults.results}
            keyExtractor={(item) => item.cfi}
            renderItem={({ item }) => (
              <SearchResultItem result={item} searchTerm={searchTerm} onPress={() => handleResultPress(item.cfi)} />
            )}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background
    },
    header: {
      flexDirection: 'row',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: `${theme.colors.searchLineColor}66`,
      paddingHorizontal: 16
    },
    textInput: {
      flex: 1,
      paddingLeft: 25,
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
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
export default SearchBook;
