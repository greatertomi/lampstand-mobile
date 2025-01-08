import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { librarySwitch } from '../../assets';
import { HorizontalBookOverview, VerticalBookOverview, HeadingSmall, PressableItem } from '../../components';
import { ScreenNavigation } from '../../routes';
import { UploadedBook } from '../../store';
import { useTheme } from '../../styles';

type LibrarySectionProps = {
  label: string;
  books: UploadedBook[];
};

export const LibrarySection = ({ label, books }: LibrarySectionProps) => {
  const [isVertical, setIsVertical] = useState(false);
  const navigation = useNavigation<ScreenNavigation<'MyBooks'>>();
  const { theme } = useTheme();
  const utils = theme.utilities;

  const navigateToReader = (filePath: string) => {
    navigation.navigate('Reader', { bookPath: filePath });
  };

  return (
    <View style={utils.gap_1}>
      <View style={[utils.flex_dir_row, utils.justify_content_between, utils.align_items_center]}>
        <HeadingSmall bold>{label}</HeadingSmall>
        <PressableItem onPress={() => setIsVertical(!isVertical)}>
          <SvgXml xml={librarySwitch(theme.colors.text)} />
        </PressableItem>
      </View>
      {isVertical ? (
        <View style={utils.gap_2}>
          {books.map((book, index) => (
            <VerticalBookOverview
              key={index}
              title={book.title}
              author={book.author}
              progress={book.progress}
              cover={book.cover}
              description={book.description}
              onPress={() => navigateToReader(book.filePath)}
            />
          ))}
        </View>
      ) : (
        <View style={styles.horizontalView}>
          {books.map((book, index) => (
            <HorizontalBookOverview
              key={index}
              title={book.title}
              author={book.author}
              progress={book.progress}
              cover={book.cover}
              onPress={() => navigateToReader(book.filePath)}
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
