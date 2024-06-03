import React, { useState } from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { HorizontalBookOverview, VerticalBookOverview, HeadingSmall, IconButton } from '../../components';
import { useTheme } from '../../styles';
import { BookType } from '../../customTypes';
import { librarySwitch } from '../../assets/svg';

type LibrarySectionProps = {
  label: string;
  books: BookType[];
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
        <View>
          {books.map((book, index) => (
            <VerticalBookOverview
              key={index}
              id={book.id}
              title={book.title}
              author={book.author}
              progress={book.progress}
              image={book.image}
              description={book.description}
            />
          ))}
        </View>
      ) : (
        <View style={[utils.flex_dir_row, utils.wrap, utils.justify_content_between]}>
          {books.map((book, index) => (
            <HorizontalBookOverview
              key={index}
              id={book.id}
              title={book.title}
              author={book.author}
              progress={book.progress}
              image={book.image}
            />
          ))}
        </View>
      )}
    </View>
  );
};
