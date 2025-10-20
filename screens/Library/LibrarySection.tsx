import { useNavigation } from '@react-navigation/native';
import { decode } from 'html-entities';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { librarySwitch } from '../../assets';
import { listView } from '../../assets/svg/listView';
import { HorizontalBookOverview, VerticalBookOverview, HeadingSmall, PressableItem } from '../../components';
import { ScreenNavigation } from '../../routes';
import { UploadedBook, useLibraryOrientationState } from '../../store';
import { useTheme } from '../../styles';

type LibrarySectionProps = {
  label: string;
  books: UploadedBook[];
};

export const LibrarySection = ({ label, books }: LibrarySectionProps) => {
  const { isVertical, setLibraryOrientation } = useLibraryOrientationState();
  const navigation = useNavigation<ScreenNavigation<'MyBooks'>>();
  const { theme } = useTheme();
  const utils = theme.utilities;

  const navigateToReader = (filePath: string, id: string, bookTitle?: string) => {
    navigation.navigate('Reader', { bookPath: filePath, bookId: id, bookTitle });
  };

  return (
    <View style={utils.gap_1}>
      <View style={[utils.flex_dir_row, utils.justify_content_between, utils.align_items_center]}>
        <HeadingSmall bold>{label}</HeadingSmall>
        <PressableItem onPress={() => setLibraryOrientation(!isVertical)}>
          {isVertical ? (
            <SvgXml xml={librarySwitch(theme.colors.text)} />
          ) : (
            <SvgXml xml={listView(theme.colors.text)} />
          )}
        </PressableItem>
      </View>
      {isVertical ? (
        <View style={utils.gap_2}>
          {books.map((book, index) => {
            const cleanDescription = decode(book.description, { level: 'html5' });
            return (
              <VerticalBookOverview
                key={index}
                id={book.id}
                mimeType={book.mimeType}
                filePath={book.filePath}
                title={book.title}
                author={book.author}
                cover={book.cover}
                state={book.state}
                description={cleanDescription}
                isFinished={book.isFinished}
                onPress={() => navigateToReader(book.filePath, book.id, book.title)}
              />
            );
          })}
        </View>
      ) : (
        <View style={styles.horizontalView}>
          {books.map((book, index) => (
            <HorizontalBookOverview
              key={index}
              id={book.id}
              title={book.title}
              author={book.author}
              cover={book.cover}
              state={book.state}
              filePath={book.filePath}
              mimeType={book.mimeType}
              isFinished={book.isFinished}
              onPress={() => navigateToReader(book.filePath, book.id, book.title)}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%'
  }
});
