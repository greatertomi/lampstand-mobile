import capitalize from 'lodash/capitalize';
import { View, Image, StyleSheet } from 'react-native';

import { HeadingLarge } from '../../components';
import { useAuthState } from '../../store';

export const HomePageTitle = () => {
  const { user, isAuthenticated } = useAuthState();

  return (
    <View>
      {isAuthenticated ? (
        <HeadingLarge bold>Welcome {capitalize(user?.fullName)}</HeadingLarge>
      ) : (
        <View style={styles.homepage}>
          <Image source={require('../../assets/logo.png')} style={styles.image} />
          <HeadingLarge bold>Homepage</HeadingLarge>
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
    height: 32,
    resizeMode: 'stretch'
  }
});
