import BottomSheetComponent, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps
} from '@gorhom/bottom-sheet';
import React, { ReactNode, ReactElement, useCallback, useMemo, forwardRef, useImperativeHandle } from 'react';
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
  buttonIcon?: ReactElement;
  containerStyle?: ViewStyle;
  snapPoints?: string[];
  enablePanDownToClose?: boolean;
}

export interface BottomSheetRef {
  close: () => void;
  open: () => void;
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
      buttonIcon,
      containerStyle,
      snapPoints = ['50%'],
      enablePanDownToClose = true
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = createStylesheet(theme);

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
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} pressBehavior="close" />
      ),
      []
    );

    const bottomSheetRef = React.useRef<BottomSheetComponent>(null);

    React.useEffect(() => {
      if (isVisible) {
        bottomSheetRef.current?.expand();
      } else {
        bottomSheetRef.current?.close();
      }
    }, [isVisible]);

    useImperativeHandle(
      ref,
      () => ({
        close: () => {
          bottomSheetRef.current?.close();
        },
        open: () => {
          bottomSheetRef.current?.expand();
        }
      }),
      []
    );

    return (
      <BottomSheetComponent
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPointsMemo}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={enablePanDownToClose}
        handleIndicatorStyle={styles.handleIndicator}
        backgroundStyle={styles.background}
        animateOnMount
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
              {footer || <PrimaryButton title={primaryButtonText} icon={buttonIcon} onPress={primaryButtonOnPress} />}
            </View>
          )}
        </BottomSheetView>
      </BottomSheetComponent>
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
