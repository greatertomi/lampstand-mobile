import { View, Image, StyleSheet } from 'react-native';

import { BodyText } from '../../../components';
import { Theme, useTheme } from '../../../styles';

import { readingSpeedData } from './dummyData';

export const ReadingSpeed = () => {
  const { theme } = useTheme();
  const utils = theme.utilities;

  return (
    <View>
      {readingSpeedData.map((data, index) => {
        const isLastItem = index === readingSpeedData.length - 1;
        const styles = createStyleSheet(theme, isLastItem);

        return (
          <View key={index} style={styles.container}>
            <View style={utils.flex_dir_row}>
              <BodyText variant="primary" bold>
                {data.data}
              </BodyText>
              <BodyText style={styles.text}>{data.label}</BodyText>
            </View>
            <Image source={require('../../../assets/bookImages/bookEight.png')} style={styles.image} />
          </View>
        );
      })}
    </View>
  );
};

const createStyleSheet = (theme: Theme, lastItem: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: lastItem ? 0 : 1,
      borderColor: theme.colors.border,
      padding: 16
    },
    image: {
      width: 47,
      height: 72,
      resizeMode: 'cover',
      transform: [{ rotate: '10deg' }]
    },
    text: {
      marginLeft: 4
    }
  });
