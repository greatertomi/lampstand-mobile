import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { handSlide, slide } from '../../../../assets';
import { PreferenceList } from '../../../../components';
import { useReader } from '../../../../package/epub-reader';
import { Theme, useTheme } from '../../../../styles';
import { ICON_SIZE } from '../../../../utils';

import { FLowAction } from './types';

export const SwipeActions = ({ onClose }: { onClose: () => void }) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const { flow, setFlow } = useReader();

  const swipeActions = [
    {
      label: 'Slide',
      svg: slide(theme.colors.text),
      type: FLowAction.SLIDE
    },
    {
      label: 'Scroll',
      svg: handSlide(theme.colors.text),
      type: FLowAction.SCROLL
    }
  ];

  return (
    <View style={styles.container}>
      {swipeActions.map((action, index) => (
        <PreferenceList
          key={index}
          title={action.label}
          hasUnderline={index !== swipeActions.length - 1}
          hasLeftIcon
          leftIcon={<SvgXml xml={action.svg} />}
          rightElement={
            flow === action.type ? (
              <MaterialCommunityIcons name="check" size={ICON_SIZE} color={theme.colors.primary} />
            ) : null
          }
          isPressable
          onPress={() => {
            setFlow(action.type);
            onClose();
          }}
        />
      ))}
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      width: 173,
      bottom: '90%',
      right: '10%',
      padding: 8,
      backgroundColor: theme.colors.background,
      borderRadius: 10
    },
    line: {
      height: 1,
      backgroundColor: theme.colors.readerLineColor
    }
  });
