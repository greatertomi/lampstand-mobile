import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { invalid, uploadIcon } from '../../assets';
import { BodyText, HeadingSmall, PressableItem, PrimaryButton } from '../../components';
import { Theme, useTheme } from '../../styles';

interface BookModalProps {
  onPress: () => void;
  onClose: () => void;
}

const UnsupportedBookModal = ({ onPress, onClose }: BookModalProps) => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStylesheet(theme);
  return (
    <View>
      <Modal transparent animationType="fade" onRequestClose={onClose}>
        <PressableItem style={styles.overlay} onPress={onClose}>
          <View style={styles.container}>
            <SvgXml xml={invalid} />
            <View style={[utils.align_items_center]}>
              <HeadingSmall bold style={[utils.my_1]}>
                Unsupported book format
              </HeadingSmall>
              <BodyText style={[utils.mb_1, utils.text_center]}>
                Oops! It looks like the book format you uploaded isn&apos;t supported. We currently accept EPUB.
              </BodyText>
            </View>
            <View style={[utils.width_100, utils.mt_1]}>
              <PrimaryButton
                title="Upload a different file"
                icon={<SvgXml xml={uploadIcon({ color: theme.colors.white, size: 14 })} />}
                onPress={() => {
                  onClose();
                  onPress();
                }}
              />
            </View>
          </View>
        </PressableItem>
      </Modal>
    </View>
  );
};

const createStylesheet = (theme: Theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: 200,
    },
    container: {
      width: 310,
      backgroundColor: theme.colors.background,
      borderRadius: 10,
      paddingVertical: 20,
      paddingHorizontal: 24,
      elevation: 5,
      alignItems: 'center'
    }
  });

export default UnsupportedBookModal;
