import { BottomSheetView, BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { ReactNode, ReactElement, useCallback, useMemo, forwardRef, useImperativeHandle, useState } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { Theme, useTheme } from '../../styles';
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
  IsPrimaryButtonLoading?: boolean;
  IsPrimaryButtonDisabled?: boolean;
  buttonIcon?: ReactElement;
  containerStyle?: ViewStyle;
  snapPoints?: string[];
  enablePanDownToClose?: boolean;
  gestureEnabled?: boolean;
  disableBackdrop?: boolean;
  onChangeTheme?: (theme: Theme) => void;
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
      IsPrimaryButtonLoading,
      IsPrimaryButtonDisabled,
      buttonIcon,
      containerStyle,
      snapPoints = ['50%'],
      enablePanDownToClose = true,
      gestureEnabled,
      disableBackdrop
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useMemo(() => createStylesheet(theme), [theme]);
    // const styles = createStylesheet(theme);
    const [isInternalGestureEnabled, setIsInternalGestureEnabled] = useState(gestureEnabled);

    const snapPointsMemo = useMemo(() => snapPoints, [snapPoints]);

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
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} pressBehavior="none" />
      ),
      []
    );

    const bottomSheetRef = React.useRef<BottomSheetModal>(null);

    React.useEffect(() => {
      if (isVisible) {
        bottomSheetRef.current?.present();
      } else {
        bottomSheetRef.current?.dismiss();
      }
    }, [isVisible, theme]);

    React.useEffect(() => {
      setIsInternalGestureEnabled(gestureEnabled ?? true);
    }, [gestureEnabled]);

    React.useEffect(() => {
      if (theme) {
        bottomSheetRef.current?.snapToIndex(0); // Force update
      }
    }, [theme]);

    useImperativeHandle(
      ref,
      () => ({
        close: () => {
          bottomSheetRef.current?.dismiss();
        },
        open: () => {
          bottomSheetRef.current?.present();
        },
        setGestureEnabled: (enabled: boolean) => {
          setIsInternalGestureEnabled(enabled);
        }
      }),
      []
    );

    return (
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPointsMemo}
        onChange={handleSheetChanges}
        backdropComponent={disableBackdrop ? undefined : renderBackdrop}
        enablePanDownToClose={enablePanDownToClose}
        handleIndicatorStyle={styles.handleIndicator}
        backgroundStyle={styles.background}
        animateOnMount
        enableHandlePanningGesture={isInternalGestureEnabled}
        enableContentPanningGesture={isInternalGestureEnabled}
      >
        <BottomSheetView style={[styles.container, containerStyle]}>
          {logo && (
            <View style={styles.logoContainer}>
              <SvgXml xml={logo} />
            </View>
          )}
          <View style={styles.content}>{children}</View>
          {(footer || primaryButtonText) && (
            <View style={[styles.footer, footerStyle]}>
              {footer || (
                <PrimaryButton
                  title={primaryButtonText}
                  icon={buttonIcon}
                  onPress={primaryButtonOnPress}
                  disabled={IsPrimaryButtonDisabled}
                  loading={IsPrimaryButtonLoading}
                />
              )}
            </View>
          )}
        </BottomSheetView>
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
