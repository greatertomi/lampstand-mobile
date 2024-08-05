import React from 'react';
import { SvgXml } from 'react-native-svg';
import { StyleSheet, View } from 'react-native';
import { BodyText, HeadingLarge } from '../Typography';
import { utilities } from '../../styles';
import { PrimaryButton } from '../Button';

export type MessagePopUpProps = {
  svg: string;
  buttonTitle: string;
  message: string;
  description: string;
  onPress?: () => void;
};

export const MessagePopUp = ({ svg, buttonTitle, message, description, onPress }: MessagePopUpProps) => (
  <View style={styles.container}>
    <SvgXml xml={svg} />
    <View style={styles.content}>
      <View style={styles.messageContent}>
        <HeadingLarge style={utilities.text_center}>{message}</HeadingLarge>
        <BodyText style={utilities.text_center}>{description}</BodyText>
      </View>
      <PrimaryButton title={buttonTitle} onPress={onPress} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 200
  },
  content: {
    top: 74
  },
  messageContent: {
    paddingHorizontal: 50,
    gap: 8,
    marginBottom: 44
  }
});
