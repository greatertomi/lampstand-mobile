import capitalize from 'lodash/capitalize';
import { View, StyleSheet } from 'react-native';

import { HeadingSmall } from '../../components';
import { UploadedBook, useAuthState } from '../../store';
import { SvgXml } from 'react-native-svg';
import { logo } from '../../assets';

type HomePageTitleProps = {
  key: string;
  doesUserHasBooks?: boolean;
};

export const HomePageTitle = ({ key, doesUserHasBooks }: HomePageTitleProps) => {
  const { user, isAuthenticated } = useAuthState();

  return (
    <View key={key}>
      {isAuthenticated ? (
        <HeadingSmall bold>{doesUserHasBooks ? 'Library' : `Welcome ${capitalize(user?.fullName)}`}</HeadingSmall>
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
