import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { useCallback } from 'react';
import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { SvgXml } from 'react-native-svg';

import { BodyText } from '../components';
import { Theme, useTheme } from '../styles';
import { BOTTOM_TAB_HEIGHT } from '../utils';

import { getTabIcon } from './routesUtils';

type Route = RouteProp<{ [key: string]: object | undefined }, string>;

export const CustomBottomTab = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const marginAroundFocused = 20;
  const stylesParams = {
    theme,
    tabBarWidth: width - 2,
    tabWidth: (width - 2) / state.routes.length,
    focusedWidth: (width - 2) / state.routes.length - 2 * marginAroundFocused
  };
  const styles = createStyleSheet(stylesParams);

  const translateAnimation = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(stylesParams.tabWidth * state.index) }]
  }));

  const changeIconColor = useCallback(
    (xml: string | undefined, isFocused: boolean): string => {
      if (!xml) return '';
      const color = isFocused ? theme.colors.white : theme.colors.iconDefaultColor;
      return xml.replaceAll(/stroke="[^"]+"/g, `stroke="${color}"`);
    },
    [theme.colors.iconDefaultColor, theme.colors.white]
  );

  const handlePress = useCallback(
    (route: Route, isFocused: boolean) => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name, route.params);
      }
    },
    [navigation]
  );

  const handleLongPress = useCallback(
    (route: Route) => {
      navigation.emit({
        type: 'tabLongPress',
        target: route.key
      });
    },
    [navigation]
  );

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animation, translateAnimation]}>
        <View style={styles.focused} />
      </Animated.View>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const tabItem = getTabIcon(route.name);

        return (
          <Pressable
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={() => handlePress(route, isFocused)}
            onLongPress={() => handleLongPress(route)}
            style={{ flex: 1 }}
          >
            <View style={styles.tabItem}>
              <SvgXml xml={changeIconColor(tabItem?.icon, isFocused)} />
              {isFocused && <BodyText style={{ color: isFocused && theme.colors.white }}>{tabItem?.tabName}</BodyText>}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

interface StyleSheetParams {
  theme: Theme;
  tabBarWidth: number;
  tabWidth: number;
  focusedWidth: number;
}

const createStyleSheet = ({ theme, tabBarWidth, tabWidth, focusedWidth }: StyleSheetParams) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      height: BOTTOM_TAB_HEIGHT,
      width: tabBarWidth,
      position: 'absolute',
      bottom: 0,
      backgroundColor: theme.colors.cardBackground,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10
    },
    tabItem: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8
    },
    animation: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      justifyContent: 'center',
      width: tabWidth
    },
    focused: {
      height: 40,
      width: focusedWidth,
      borderRadius: 30,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
