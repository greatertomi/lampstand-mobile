import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { BookOverview, BookOverview2, HeadingSmall } from '../../components';
import { useTheme } from '../../styles';
import { BookType } from '../../customTypes';
import { chunkBooks } from '../../utils';
import { librarySwitch } from '../../assets/svg';

type LibrarySectionProps = {
  label: string;
  books: BookType[];
};

export const LibrarySection = ({ label, books }: LibrarySectionProps) => {
  const [libraryDesign, setLibraryDesign] = useState(false);
  const { theme } = useTheme();
  const utils = theme.utilities;

  const bookChunks = chunkBooks(books);

  return (
    <View style={styles.container}>
      <View style={[utils.flex_dir_row, utils.justify_content_between, utils.align_items_center]}>
        <HeadingSmall bold>{label}</HeadingSmall>
        <Pressable
          onPress={() => setLibraryDesign(!libraryDesign)}
          style={({ pressed }) => pressed && { opacity: 0.5 }}
        >
          <SvgXml xml={librarySwitch} />
        </Pressable>
      </View>
      {libraryDesign ? (
        <FlatList
          data={books}
          renderItem={({ item }) => (
            <BookOverview2
              key={item.id}
              id={item.id}
              title={item.title}
              author={item.author}
              progress={item.progress}
              description={item.description}
              image={item.image}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <FlatList
          data={bookChunks}
          renderItem={({ item }) => (
            <View style={[utils.flex_dir_row, utils.justify_content_between]}>
              {item.map((book) => (
                <BookOverview
                  key={book.id}
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  image={book.image}
                  progress={book.progress}
                />
              ))}
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={[utils.gap_2]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8
  }
});
