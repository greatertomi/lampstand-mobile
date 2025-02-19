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
};

export const MessagePopUp = ({ svg, buttonTitle, message, description, onPress }: MessagePopUpProps) => (
  <View style={styles.container}>
    <View style={styles.content}>
      <SvgXml xml={svg} />
      <View style={utilities.gap_1}>
        <HeadingLarge bold style={utilities.text_center}>
          {message}
        </HeadingLarge>
        <BodyText style={utilities.text_center}>{description}</BodyText>
      </View>
    </View>
    <PrimaryButton title={buttonTitle} onPress={onPress} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 82
  },
  content: {
    marginTop: 100,
    paddingHorizontal: 60,
    alignItems: 'center',
    gap: 24
  }
});
