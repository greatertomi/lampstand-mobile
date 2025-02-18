import capitalize from 'lodash/capitalize';
import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { logo } from '../../assets';
import { HeadingSmall } from '../../components';
import { useAuthState } from '../../store';

export const HomePageTitle = () => {
  const { user, isAuthenticated } = useAuthState();

  return (
    <View>
      {isAuthenticated ? (
        <HeadingSmall bold>Welcome {capitalize(user?.fullName)}</HeadingSmall>
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
