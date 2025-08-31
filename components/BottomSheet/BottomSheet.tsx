import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView
} from '@gorhom/bottom-sheet';
import React, { ReactNode, useCallback, useMemo, useRef, useEffect, ReactElement } from 'react';
import { View, StyleSheet, ViewStyle, KeyboardAvoidingView, Platform } from 'react-native';

import { Theme, ThemeProvider, useTheme } from '../../styles';
import { PrimaryButton } from '../Button';

interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  primaryButtonOnPress?: () => void;
  footer?: ReactNode;
  footerStyle?: ViewStyle;
  primaryButtonText?: string;
  isPrimaryButtonLoading?: boolean;
  isPrimaryButtonDisabled?: boolean;
  buttonIcon?: ReactElement;
  children?: ReactNode;
  containerStyle?: ViewStyle;
  snapPoints?: string[];
  enablePanDownToClose?: boolean;
  gestureEnabled?: boolean;
  disableBackdrop?: boolean;
  persistTaps?: 'always' | 'never' | 'handled';
  contentGestureEnabled?: boolean;
}

export const BottomSheet = ({
  isVisible,
  onClose,
  footer,
  footerStyle,
  primaryButtonText,
  primaryButtonOnPress,
  isPrimaryButtonLoading = false,
  isPrimaryButtonDisabled = false,
  buttonIcon,
  children,
  containerStyle,
  snapPoints = ['60%'],
  enablePanDownToClose = true,
  gestureEnabled = true,
  disableBackdrop = false,
  persistTaps = 'handled',
  contentGestureEnabled
}: BottomSheetProps) => {
  const { theme, mode } = useTheme();
  const styles = useMemo(() => createStylesheet(theme), [theme]);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.dismiss();
    }
  }, [isVisible]);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose]
  );

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} pressBehavior="close" />
    ),
    []
  );

  const renderFooter = useMemo(() => {
    if (!footer && !primaryButtonText) return null;

    return (
      <View style={[styles.footer, footerStyle]}>
        {footer || (
          <PrimaryButton
            title={primaryButtonText}
            icon={buttonIcon}
            onPress={primaryButtonOnPress}
            disabled={isPrimaryButtonDisabled}
            loading={isPrimaryButtonLoading}
          />
        )}
      </View>
    );
  }, [
    footer,
    primaryButtonText,
    footerStyle,
    buttonIcon,
    primaryButtonOnPress,
    isPrimaryButtonDisabled,
    isPrimaryButtonLoading,
    styles.footer
  ]);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backdropComponent={disableBackdrop ? undefined : renderBackdrop}
      enablePanDownToClose={enablePanDownToClose}
      handleIndicatorStyle={styles.handleIndicator}
      backgroundStyle={styles.background}
      animateOnMount
      enableHandlePanningGesture={gestureEnabled}
      enableContentPanningGesture={contentGestureEnabled}
      key={`bottom-sheet-${mode || 'default'}-${theme.colors.text}`}
    >
      <ThemeProvider>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
          enabled
        >
          <BottomSheetScrollView
            keyboardShouldPersistTaps={persistTaps}
            contentContainerStyle={[styles.container, containerStyle]}
          >
            <View style={styles.content}>{children}</View>
            {renderFooter}
          </BottomSheetScrollView>
        </KeyboardAvoidingView>
      </ThemeProvider>
    </BottomSheetModal>
  );
};

BottomSheet.displayName = 'BottomSheet';

const createStylesheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 24,
      paddingTop: 20,
      paddingBottom: 20,
      alignItems: 'center'
    },
    background: {
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20
    },
    handleIndicator: {
      backgroundColor: theme.colors.border,
      width: 40,
      height: 4
    },
    content: {
      width: '100%',
      alignItems: 'center'
    },
    footer: {
      width: '100%',
      marginTop: 16
    },
    keyboardAvoidingView: {
      flex: 1,
      width: '100%'
    }
  });
