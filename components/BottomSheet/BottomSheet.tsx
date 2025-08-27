import { BottomSheetView, BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal } from '@gorhom/bottom-sheet';
import React, {
  ReactNode,
  ReactElement,
  useCallback,
  useMemo,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect
} from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { Theme, ThemeProvider, useTheme } from '../../styles';
import { logger } from '../../utils';
import { PrimaryButton } from '../Button';

interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  primaryButtonOnPress?: () => void;
  children?: ReactNode;
  logo?: string;
  footer?: ReactNode;
  footerStyle?: ViewStyle;
  primaryButtonText?: string;
  isPrimaryButtonLoading?: boolean;
  isPrimaryButtonDisabled?: boolean;
  buttonIcon?: ReactElement;
  containerStyle?: ViewStyle;
  snapPoints?: string[];
  enablePanDownToClose?: boolean;
  gestureEnabled?: boolean;
  disableBackdrop?: boolean;
}

export interface BottomSheetRef {
  close: () => void;
  open: () => void;
  setGestureEnabled: (enabled: boolean) => void;
}

export const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  (
    {
      isVisible,
      onClose,
      primaryButtonOnPress,
      children,
      logo,
      footer,
      footerStyle,
      primaryButtonText,
      isPrimaryButtonLoading = false,
      isPrimaryButtonDisabled = false,
      buttonIcon,
      containerStyle,
      snapPoints = ['50%'],
      enablePanDownToClose = true,
      gestureEnabled = true,
      disableBackdrop = false
    },
    ref
  ) => {
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

    useImperativeHandle(
      ref,
      () => ({
        close: () => {
          bottomSheetRef.current?.dismiss();
        },
        open: () => {
          bottomSheetRef.current?.present();
        },
        setGestureEnabled: () => {
          // Note: @gorhom/bottom-sheet doesn't support dynamic gesture toggling
          // This would require a state update and re-render
          logger.warn('Dynamic gesture enabling is not supported by the current implementation');
        }
      }),
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
        enableContentPanningGesture={gestureEnabled}
        // Key prop ensures the sheet re-renders when theme changes
        key={`bottom-sheet-${mode || 'default'}-${theme.colors.text}`}
      >
        <ThemeProvider>
          <BottomSheetView
            style={[styles.container, containerStyle]}
            key={`content-${mode || 'default'}-${theme.colors.text}`}
          >
            {logo && (
              <View style={styles.logoContainer} key={`children-${mode || 'default'}-${theme.colors.text}`}>
                <SvgXml xml={logo} />
              </View>
            )}
            <View style={styles.content}>{children}</View>
            {renderFooter}
          </BottomSheetView>
        </ThemeProvider>
      </BottomSheetModal>
    );
  }
);

BottomSheet.displayName = 'BottomSheet';

const createStylesheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
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
    logoContainer: {
      marginBottom: 16,
      alignItems: 'center'
    },
    content: {
      flex: 1,
      width: '100%',
      alignItems: 'center'
    },
    footer: {
      width: '100%',
      marginTop: 16
    }
  });
