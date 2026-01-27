import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import debounce from 'lodash/debounce';
import React, { useMemo, useState } from 'react';
import { TextInput, View, StyleSheet, SafeAreaView, FlatList, Keyboard, Platform } from 'react-native';

import { BodyText, LoadingSpinner, PressableItem } from '../../../../components';
import { useReader } from '../../../../packages/epub-reader';
import { fontFamily, Theme, useTheme } from '../../../../styles';

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
              Keyboard.dismiss();
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
            <PressableItem onPress={handleClear}>
              <Feather name="x-circle" size={24} color={theme.colors.text} />
            </PressableItem>
          )}
        </View>
        {searchTerm.length === 0 ? (
          <BodyText style={styles.searchText}>Enter a word or phrase above</BodyText>
        ) : isSearching ? (
          <View style={styles.searchText}>
            <LoadingSpinner primary={theme.colors.primary} secondary={theme.colors.text} size={12} />
          </View>
        ) : // eslint-disable-next-line unicorn/no-nested-ternary
        searchResults.results.length > 0 ? (
          <FlatList
            data={searchResults.results}
            keyExtractor={(item) => item.cfi}
            renderItem={({ item }) => (
              <SearchResultItem result={item} searchTerm={searchTerm} onPress={() => handleResultPress(item.cfi)} />
            )}
          />
        ) : (
          <BodyText style={styles.searchText}>No results found</BodyText>
        )}
      </SafeAreaView>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingTop: Platform.OS === 'android' ? 30 : 0
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
      paddingBottom: 10,
      fontFamily: fontFamily.plusJakartaSans
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
