import { View } from 'react-native';

import { BodyTextLarge, BodyTextSmall } from '../../../../components';
import { useTheme } from '../../../../styles';

type EmptyTabProps = {
  label?: string;
  desc?: string;
};

export const EmptyTab = ({ label, desc }: EmptyTabProps) => {
  const { theme } = useTheme();
  const utils = theme.utilities;

  return (
    <View style={[utils.flex, utils.justify_content_center, utils.align_items_center, utils.px_3, utils.gap_1]}>
      <BodyTextLarge bold variant="secondary" style={utils.text_center}>
        {label}
      </BodyTextLarge>
      <BodyTextSmall variant="secondary" style={utils.text_center}>
        {desc}
      </BodyTextSmall>
    </View>
  );
};
