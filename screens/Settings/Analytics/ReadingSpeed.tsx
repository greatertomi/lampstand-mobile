import { View, Image, StyleSheet } from 'react-native';

import { BodyText } from '../../../components';
import { Theme, useTheme } from '../../../styles';

import { readingSpeedData } from './dummyData';

export const ReadingSpeed = () => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);

  return (
    <View style={styles.parent}>
      {readingSpeedData.map((data, index) => (
        <View key={index} style={[styles.container, index === readingSpeedData.length - 1 && styles.lastItem]}>
          <View style={utils.flex_dir_row}>
            <BodyText variant="primary" bold>
              {data.data}
            </BodyText>
            <BodyText style={styles.text}>{data.label}</BodyText>
          </View>
          <Image source={require('../../../assets/bookImages/bookEight.png')} style={styles.image} />
        </View>
      ))}
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    parent: {
      backgroundColor: theme.colors.cardBackground,
      padding: 16,
      borderRadius: 10
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: theme.colors.border,
      padding: 16,
      backgroundColor: theme.colors.cardBackground
    },
    lastItem: {
      borderBottomWidth: 0
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
