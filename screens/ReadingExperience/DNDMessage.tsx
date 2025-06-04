import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { BodyTextSmall, PrimaryButton, SecondaryButton, TagText } from '../../components';
import { Theme, useTheme, utilities as utils } from '../../styles';

type DNDMessageType = {
  onActivate: () => void;
  onDismiss: () => void;
};

export const DNDMessage = ({ onActivate, onDismiss }: DNDMessageType) => {
  const { theme } = useTheme();
  const styles = createStylesheet(theme);
  const translateY = useSharedValue(-100);
  const animatedStyle = useAnimatedStyle(() => {
    translateY.value = withTiming(0, { duration: 300 });
    return {
      transform: [{ translateY: translateY.value }]
    };
  });

  return (
    <Animated.View style={[styles.container, styles.infoContainer, animatedStyle]}>
      <View style={[utils.mt_4, utils.gap_1]}>
        <View style={[utils.flex_dir_row, utils.align_items_center, utils.gap_1]}>
          <FontAwesome name="bell-slash-o" size={20} color={theme.colors.primary} />
          <BodyTextSmall variant="default" bold>
            Activate Do Not Disturb Mode?
          </BodyTextSmall>
        </View>
        <TagText variant="default">
          Stay focused on your reading! Activating Do Not Disturb mode pauses all notifications until you turn it off.
        </TagText>
        <View
          style={[utils.flex_dir_row, utils.align_items_center, utils.justify_content_center, utils.gap_1, utils.mt_1]}
        >
          <PrimaryButton title="Activate" onPress={onActivate} style={utils.width_50} />
          <SecondaryButton title="Dismiss" onPress={onDismiss} style={utils.width_50} />
        </View>
      </View>
    </Animated.View>
  );
};

const createStylesheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,
      paddingVertical: 20,
      paddingHorizontal: 12,
      zIndex: 1,
      position: 'absolute',
      width: '100%',
      top: 0
    },
    infoContainer: {
      backgroundColor: theme.colors.infoAlertBg
    }
  });
