import React from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { invalid, uploadIcon } from '../../assets';
import { BodyText, CustomModal, HeadingSmall } from '../../components';
import { useTheme } from '../../styles';

interface BookModalProps {
  onPress: () => void;
  onClose: () => void;
}

const UnsupportedBookModal = ({ onPress, onClose }: BookModalProps) => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  return (
    <CustomModal
      onClose={onClose}
      onPress={onPress}
      primaryButtonText="Upload a different file"
      logo={invalid}
      buttonIcon={<SvgXml xml={uploadIcon({ color: theme.colors.white, size: 14 })} />}
    >
      <View style={[utils.align_items_center]}>
        <HeadingSmall bold style={[utils.my_1]}>
          Unsupported book format
        </HeadingSmall>
        <BodyText style={[utils.mb_1, utils.text_center]}>
          Oops! It looks like the book format you uploaded isn&apos;t supported. We currently accept EPUB.
        </BodyText>
      </View>
    </CustomModal>
  );
};

export default UnsupportedBookModal;
