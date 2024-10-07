import React, { ReactNode } from 'react';
import { Pressable, StyleSheet, Modal, View, ModalProps, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Theme, useTheme } from '../../styles';
import { Alert } from '../Alerts';

type DialogProps = {
  show?: boolean;
  alertMessage: string | null;
  alertVariant: 'success' | 'error';
  onClose?: () => void;
  onAlertDismiss: () => void;
  children?: ReactNode;
} & ModalProps;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const Dialog = ({
  alertMessage,
  alertVariant,
  onAlertDismiss,
  children,
  show,
  onClose,
  ...rest
}: DialogProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  const initialHeight = SCREEN_HEIGHT / 2;
  const height = useSharedValue(initialHeight);

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      height.value = initialHeight - event.translationY;

      if (height.value < initialHeight) {
        height.value = initialHeight;
      } else if (height.value > SCREEN_HEIGHT) {
        height.value = SCREEN_HEIGHT;
      }
    })
    .onEnd(() => {
      height.value = withSpring(height.value - initialHeight > SCREEN_HEIGHT / 4 ? SCREEN_HEIGHT : initialHeight);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value
  }));

  return (
    <Modal animationType="slide" transparent visible={show} {...rest}>
      <View style={styles.overlay}>
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.modalContent, animatedStyle]}>
            <Pressable onPress={onClose}>
              <View style={styles.line} />
            </Pressable>
            {children}
            {!!alertMessage && <Alert variant={alertVariant} onDismiss={onAlertDismiss} message={alertMessage} />}
          </Animated.View>
        </GestureDetector>
      </View>
    </Modal>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: theme.colors.overlayBackground
    },
    modalContent: {
      width: '100%',
      position: 'absolute',
      bottom: 0,
      backgroundColor: theme.colors.background,
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
      overflow: 'hidden'
    },
    line: {
      width: 40,
      height: 5,
      marginTop: 15,
      alignSelf: 'center',
      borderRadius: 10,
      backgroundColor: theme.colors.secondaryText
    }
  });
