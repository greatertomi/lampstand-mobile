import { View, StyleSheet, Image } from 'react-native';
import * as Progress from 'react-native-progress';

import { BodyText, BodyTextSmall, PressableItem } from '../../../components';
import { Theme, useTheme } from '../../../styles';

export const BooksInProgress = () => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);
  const data = [
    {
      title: 'Califonia',

      author: 'Edan  Lepucki',
      cover: require('../../../assets/bookImages/bookFour.png'),
      progress: 0.56
    },
    {
      title: 'Ukraine',
      author: 'mykailo  mudryk',
      cover: require('../../../assets/bookImages/bookFive.png'),
      progress: 0.23
    }
  ];

  return (
    <View style={utils.gap_1}>
      {data.map((item, index) => (
        <View key={index} style={styles.container}>
          <View style={[utils.flex_dir_row, utils.gap_1, utils.align_items_center]}>
            <View style={styles.bookImage}>
              <Image source={item.cover} style={styles.bookImage} />
            </View>
            <View style={[utils.flex_dir_column, utils.gap_1]}>
              <BodyText bold>{item.title}</BodyText>
              <BodyTextSmall>{item.author}</BodyTextSmall>
              <PressableItem>
                <BodyTextSmall variant="primary" bold>
                  Continue Reading
                </BodyTextSmall>
              </PressableItem>
            </View>
          </View>
          <View>
            <Progress.Circle
              animated
              progress={item.progress}
              size={50}
              borderWidth={0}
              unfilledColor={theme.colors.border}
              color={theme.colors.primary}
              showsText
              formatText={() => `${Math.round(item.progress * 100)}%`}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.cardBackground,
      height: 92,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10
    },
    bookImage: {
      width: 45,
      height: 72,
      borderRadius: 5
    }
  });
