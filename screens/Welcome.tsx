import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { uploadIcon } from '../assets';
import { BodyText, BodyTextSmall, PrimaryButton } from '../components';
import { UpdateModal } from '../components/Modal';
import { Theme, useTheme, utilities } from '../styles';
import { checkAppVersion, VersionCheckResult } from '../utils/checkAppVersion';

interface WelcomeProps {
  onPress: () => void;
  isAllBooksFinished: boolean;
}

export const Welcome = ({ onPress, isAllBooksFinished }: WelcomeProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

   const [updateData, setUpdateData] = useState<VersionCheckResult | null>(null);

  useEffect(() => {
    const verifyVersion = async () => {
      const result = await checkAppVersion();
      if (result) setUpdateData(result);
    };
    verifyVersion();
  }, []);

  return (
    <View>
      {updateData?.showModal && (
        <UpdateModal
          visible={updateData.showModal}
          mandatory={updateData.mandatory}
          storeUrl={updateData.storeUrl}
          message={
            updateData.message ??
            'A brand new version of the lamp stand app is available in the App Store. Please update your use all of our amazing features'
          }
          onClose={() => !updateData.mandatory && setUpdateData(null)}
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
      marginTop: 40,
      borderWidth: 1,
      backgroundColor: theme.colors.cardBackground,
      borderColor: theme.colors.border,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8
    }
  });
