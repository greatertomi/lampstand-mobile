import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import useSWR from 'swr';

import { endpoints } from '../api';
import { uploadIcon } from '../assets';
import { BodyText, BodyTextSmall, PrimaryButton } from '../components';
import { UpdateBanner } from '../components/Card/UpdateBanner';
import { UpdateStatusView } from '../components/Card/UpdateStatusView';
import { Theme, useTheme, utilities } from '../styles';
import { checkAppVersion, VersionCheckResult } from '../utils/checkAppVersion';

interface WelcomeProps {
  onPress: () => void;
  isAllBooksFinished: boolean;
}

type MyBooksNavigationProp = {
  navigate: (screen: 'UpdateScreen', params: { storeUrl: string }) => void;
};

export const Welcome = ({ onPress, isAllBooksFinished }: WelcomeProps) => {
  const navigation = useNavigation<MyBooksNavigationProp>();
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  const [isShowBanner, setIsShowBanner] = useState(false);
  const [bannerData, setBannerData] = useState<VersionCheckResult | null>(null);

  const { data, error, isLoading } = useSWR(endpoints.appVersion, async () => checkAppVersion(), {
    revalidateOnFocus: false
  });

  useEffect(() => {
    if (data && data.showModal) {
      setIsShowBanner(true);
      setBannerData(data);
    } else {
      setIsShowBanner(false);
    }
  }, [data]);

  const handleCloseBanner = () => {
    if (bannerData?.mandatory) return;
    setIsShowBanner(false);
  };

  const navigateToUpdateScreen = () => {
    if (!bannerData) return;
    navigation.navigate('UpdateScreen', {
      storeUrl: bannerData.storeUrl
    });
  };

  return (
    <View>
      <UpdateStatusView isLoading={isLoading} error={error} theme={theme} />
      {isShowBanner && bannerData && (
        <UpdateBanner
          mandatory={bannerData.mandatory}
          storeUrl={bannerData.storeUrl}
          message={bannerData.message}
          onClose={handleCloseBanner}
          onUpdatePress={navigateToUpdateScreen}
        />
      )}

      <View style={styles.nullUser}>
        {isAllBooksFinished ? (
          <BodyText>Import more books to read</BodyText>
        ) : (
          <BodyText bold>Welcome to Lampstand!</BodyText>
        )}
        <BodyTextSmall>{`${isAllBooksFinished ? 'Continue' : 'Let’s start by'} filling your bookshelf:`}</BodyTextSmall>

        <View style={[utilities.width_75, utilities.mt_1]}>
          <PrimaryButton
            title="Import books"
            icon={<SvgXml xml={uploadIcon({ color: theme.colors.white, size: 14 })} />}
            onPress={onPress}
          />
        </View>
      </View>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    nullUser: {
      height: 185,
      marginTop: 30,
      borderWidth: 1,
      backgroundColor: theme.colors.cardBackground,
      borderColor: theme.colors.border,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8
    }
  });
