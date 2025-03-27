import { View, Image, StyleSheet } from 'react-native';

import { BodyText } from '../../../components';
import { Theme, useTheme, utilities } from '../../../styles';

import { bookAuthors } from './dummyData';

export const BookAuthors = () => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return (
    <View style={styles.container}>
      {bookAuthors.map((author, index) => (
        <View style={styles.content} key={index}>
          <Image source={author.image} style={styles.image} />
          <View>
            <BodyText style={styles.text} bold numberOfLines={1}>
              {author.name}
            </BodyText>
            <BodyText variant="secondary" style={utilities.text_center} numberOfLines={1}>
              {author.boolTitle}
            </BodyText>
          </View>
        </View>
      ))}
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: theme.colors.cardBackground,
      paddingVertical: 16,
      paddingHorizontal: 8,
      borderRadius: 10
    },
    content: {
      width: '25%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    image: {
      width: 49,
      height: 49,
      resizeMode: 'cover',
      borderRadius: 50,
      marginBottom: 14
    },
    text: {
      marginBottom: 4,
      textAlign: 'center'
    }
  });
