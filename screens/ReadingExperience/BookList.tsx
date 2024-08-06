import React, { useEffect } from 'react';
import { View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { UploadedBook } from '../../store/database/types';
import { fetchBooks } from '../../store/database';
import { BodyText, HeadingSmall, PrimaryButton } from '../../components';
import { utilities } from '../../styles';
import { RootStackParamList } from '../../routes';
import { logger } from '../../utils';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'BookList'>;

export const BookList = () => {
  const [books, setBooks] = React.useState<UploadedBook[]>([]);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const handleFetchBooks = async () => {
      try {
        const uploadedBooks = await fetchBooks();
        setBooks(uploadedBooks);
      } catch (error) {
        logger.error(error);
      }
    };

    handleFetchBooks();
  }, []);

  return books.map((book) => (
    <View key={book.name} style={[utilities.mb_3]}>
      <HeadingSmall>{book.title}</HeadingSmall>
      <BodyText style={[utilities.mb_1]}>{book.name}</BodyText>
      <PrimaryButton
        title="Read book"
        onPress={() => navigation.navigate('BookDetails', { bookPath: book.filePath })}
      />
    </View>
  ));
};
