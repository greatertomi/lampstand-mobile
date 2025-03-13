import { View } from 'react-native';

import { BodyTextLarge, BodyTextSmall } from '../../../components';

type TitleAndDescProps = {
  title: string;
  description: string;
};

export const TitleAndDesc = ({ title, description }: TitleAndDescProps) => (
  <View>
    <BodyTextLarge bold>{title}</BodyTextLarge>
    <BodyTextSmall variant="secondary">{description}</BodyTextSmall>
  </View>
);
