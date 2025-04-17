import { ReactNode, ReactElement } from 'react';
import { Modal, Pressable, StyleSheet, TouchableWithoutFeedback, ViewStyle, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { Theme, useTheme } from '../../styles';
import { PrimaryButton } from '../Button';

interface CustomModalProps {
  onClose: () => void;
  primaryButtonOnPress?: () => void;
  children?: ReactNode;
  logo?: string;
  footer?: ReactNode;
  footerStyle?: ViewStyle;
  primaryButtonText?: string;
  buttonIcon?: ReactElement;
  modalContainerStyle?: ViewStyle;
}

export const CustomModal = ({
  onClose,
  primaryButtonOnPress,
  children,
  logo,
  footer,
  footerStyle,
  primaryButtonText,
  buttonIcon,
  modalContainerStyle
}: CustomModalProps) => {
  const { theme } = useTheme();
  const styles = createStylesheet(theme);

  return (
    <Modal transparent animationType="fade" onRequestClose={onClose}>
      <Pressable onPress={onClose} style={[styles.overlay]}>
        <TouchableWithoutFeedback>
          <View style={[styles.container, modalContainerStyle]}>
            {logo && <SvgXml xml={logo} />}
            {children}
            <View style={[styles.Button, footerStyle]}>
              {footer || <PrimaryButton title={primaryButtonText} icon={buttonIcon} onPress={primaryButtonOnPress} />}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
};

const createStylesheet = (theme: Theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.overlayBackground
    },
    container: {
      width: 310,
      backgroundColor: theme.colors.background,
      borderRadius: 10,
      paddingVertical: 20,
      paddingHorizontal: 24,
      elevation: 5,
      alignItems: 'center'
    },
    Button: {
      width: '100%',
      marginTop: 8
    }
  });
