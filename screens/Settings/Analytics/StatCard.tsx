import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { bookFrame } from '../../../assets';
import { BodyTextLarge, BodyTextSmall } from '../../../components';
import { Theme, useTheme } from '../../../styles';

import { reports } from './dummyData';

export const StatCard = () => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const utils = theme.utilities;

  return (
    <View style={[utils.flex_dir_row, utils.wrap, utils.justify_content_between, utils.mb_1]}>
      {reports.map((report, index) => (
        <View style={styles.container} key={index}>
          <SvgXml xml={bookFrame} style={styles.bookFrame} />
          <BodyTextSmall bold>{report.title}</BodyTextSmall>
          <BodyTextLarge bold variant="primary">
            {report.value}
          </BodyTextLarge>
        </View>
      ))}
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: '49%',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 10,
      backgroundColor: theme.colors.cardBackground,
      padding: 8,
      marginVertical: 6
    },
    bookFrame: {
      width: 40,
      height: 40
    }
  });
