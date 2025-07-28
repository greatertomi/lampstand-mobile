import capitalize from 'lodash/capitalize';
import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { logo } from '../../assets';
import { HeadingSmall } from '../../components';
import { useAuthState } from '../../store';

export const HomePageTitle = () => {
  const { user, isAuthenticated } = useAuthState();
  const firstName = user?.fullName.split(' ')[0];

  return (
    <View>
      {isAuthenticated ? (
        <View style={styles.container}>
          <HeadingSmall bold>Welcome&nbsp;</HeadingSmall>
          <HeadingSmall bold numberOfLines={1} ellipsizeMode="tail" style={styles.welcomeHeading}>
            {capitalize(firstName)}
          </HeadingSmall>
        </View>
      ) : (
        <View style={styles.homepage}>
          <SvgXml xml={logo} style={styles.image} />
          <HeadingSmall bold>Lampstand</HeadingSmall>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    maxWidth: '100%'
  },
  welcomeHeading: {
    maxWidth: 150,
    marginLeft: 2
  },
  homepage: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  image: {
    width: 32,
    height: 25,
    resizeMode: 'stretch'
  }
});
