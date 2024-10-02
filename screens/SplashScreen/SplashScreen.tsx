import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useTheme } from '../../styles';
import { bookSVG } from '../../assets';

export const LampstandSplash = () => {
  const { theme } = useTheme();
  const utils = theme.utilities;

  return (
    <View style={styles.container}>
      <View style={[utils.flex_dir_row, utils.justify_content_center]}>
        <SvgXml xml={bookSVG} style={utils.mr_n5} />
        <SvgXml xml={bookSVG} />
      </View>
      <Text style={styles.text}>Lampstand.</Text>
      <View style={[utils.flex_dir_row, utils.justify_content_center]}>
        <SvgXml xml={bookSVG} style={utils.mr_n5} />
        <SvgXml xml={bookSVG} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#ea4335'
  },
  splashImage: {
    display: 'none'
  },
  text: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff'
  }
});
