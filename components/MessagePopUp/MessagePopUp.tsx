import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { utilities } from '../../styles';
import { PrimaryButton } from '../Button';
import { BodyText, HeadingLarge } from '../Typography';

export type MessagePopUpProps = {
  svg: string;
  buttonTitle: string;
  message: string;
  description: string;
  onPress?: () => void;
  descriptionVariant?: 'primary' | 'secondary' | 'tertiary';
};

export const MessagePopUp = ({
  svg,
  buttonTitle,
  message,
  description,
  onPress,
  descriptionVariant
}: MessagePopUpProps) => (
  <View style={styles.container}>
    <View style={styles.content}>
      <SvgXml xml={svg} />
      <View style={utilities.gap_1}>
        <HeadingLarge bold style={utilities.text_center}>
          {message}
        </HeadingLarge>
        <BodyText variant={descriptionVariant} style={utilities.text_center}>
          {description}
        </BodyText>
      </View>
    </View>
    <PrimaryButton title={buttonTitle} onPress={onPress} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingVertical: 82,
    paddingHorizontal: 20
  },
  content: {
    marginTop: 70,
    alignItems: 'center',
    gap: 24
  }
});
