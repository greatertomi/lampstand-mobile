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
  containerStyle?: object;
  descriptionVariant?: 'primary' | 'secondary' | 'tertiary';
};

export const MessagePopUp = ({
  svg,
  buttonTitle,
  message,
  description,
  onPress,
  containerStyle,
  descriptionVariant
}: MessagePopUpProps) => (
  <View style={[styles.container, containerStyle]}>
    <SvgXml xml={svg} />
    <View style={styles.content}>
      <View style={styles.messageContent}>
        <HeadingLarge style={utilities.text_center}>{message}</HeadingLarge>
        <BodyText variant={descriptionVariant} style={utilities.text_center}>
          {description}
        </BodyText>
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
