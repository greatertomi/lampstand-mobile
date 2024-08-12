import React, { useState } from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { HorizontalBookOverview, VerticalBookOverview, HeadingSmall, IconButton } from '../../components';
import { useTheme } from '../../styles';
import { librarySwitch } from '../../assets/svg';
import { UploadedBook } from '../../store/database/types';
import { cleanTitle } from '../../utils';

type LibrarySectionProps = {
  label: string;
  books: UploadedBook[];
};

export const LibrarySection = ({ label, books }: LibrarySectionProps) => {
  const [isVertical, setIsVertical] = useState(false);
  const { theme } = useTheme();
  const utils = theme.utilities;

  return (
    <View style={utils.gap_1}>
      <View style={[utils.flex_dir_row, utils.justify_content_between, utils.align_items_center]}>
        <HeadingSmall bold>{label}</HeadingSmall>
        <IconButton onPress={() => setIsVertical(!isVertical)}>
          <SvgXml xml={librarySwitch} />
        </IconButton>
      </View>
      {isVertical ? (
        <View style={utils.gap_2}>
          {books.map((book, index) => (
            <VerticalBookOverview
              key={index}
              title={cleanTitle(book.title)}
              name={book.name}
              progress={book.progress}
              cover={book.cover}
              description={book.description}
            />
          ))}
        </View>
      ) : (
        <View style={[utils.flex_dir_row, utils.wrap, utils.justify_content_around, utils.gap_2]}>
          {books.map((book, index) => (
            <HorizontalBookOverview
              key={index}
              title={cleanTitle(book.title)}
              name={book.name}
              progress={book.progress}
              cover={book.cover}
            />
          ))}
        </View>
      )}
    </View>
  );
};
