import React from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { BodyTextLarge, HeadingSmall, PrimaryButton } from '../index';
import { utilities as utils } from '../../styles';

export type FullPageErrorProps = {
  svg: string | null;
  message: string;
  description: string;
  onPress?: () => void;
};

export const FullPageError = ({ svg, message, description, onPress }: FullPageErrorProps) => (
  <View style={[utils.flex, utils.justify_content_center, utils.align_items_center]}>
    <SvgXml xml={svg} />
    <View style={utils.align_items_center}>
      <HeadingSmall bold>{message}</HeadingSmall>
      <BodyTextLarge variant="secondary">{description}</BodyTextLarge>
    </View>
    <View style={[utils.mt_3, utils.width_100]}>
      <PrimaryButton title="Try again" onPress={onPress} />
    </View>
  </View>
);
