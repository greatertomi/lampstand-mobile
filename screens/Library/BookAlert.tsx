import React from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Theme, useTheme } from '../../styles';
import { HeadingSmall } from '../../components';
import { achievement } from '../../assets';

interface BookSuccessProps {
  visible: boolean;
  onClose: () => void;
}

export const BookAlert = ({ visible, onClose }: BookSuccessProps) => {
  const { theme } = useTheme();
  const styles = createStylesheet(theme);

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.container}>
          <HeadingSmall bold>Book added to Library</HeadingSmall>
          <SvgXml xml={achievement} width={100} height={98} />
        </View>
      </Pressable>
    </Modal>
  );
};

const createStylesheet = (theme: Theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    container: {
      width: 228,
      height: 200,
      justifyContent: 'center',
      gap: 16,
      backgroundColor: theme.colors.background,
      borderRadius: 24,
      alignItems: 'center',
      elevation: 5
    }
  });
