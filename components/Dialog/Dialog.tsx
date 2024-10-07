import React, { forwardRef, useCallback, useMemo } from 'react';
import { Text } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTheme, utilities } from '../../styles';

type Ref = BottomSheet;

export const Dialog = forwardRef<Ref>((_, ref) => {
  const { theme } = useTheme();
  const snapPoints = useMemo(() => ['50%', '75%', '100%'], []);

  const renderBackDrop = useCallback(
    (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
    []
  );

  return (
    <GestureHandlerRootView style={utilities.flex}>
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: theme.colors.background }}
        handleIndicatorStyle={{ backgroundColor: theme.colors.primary, width: '20%' }}
        backdropComponent={renderBackDrop}
      >
        <Text>Your Dialog Content</Text>
      </BottomSheet>
    </GestureHandlerRootView>
  );
});
