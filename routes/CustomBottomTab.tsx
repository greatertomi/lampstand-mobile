import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Theme, useTheme } from '../styles';
import { getTabIcon } from './routesUtils';
import { BodyText } from '../components';

export const CustomBottomTab = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const marginAroundFocused = 20;
  const TAB_BAR_WIDTH = width - 2;
  const TAB_WIDTH = TAB_BAR_WIDTH / state.routes.length;
  const focusedWidth = TAB_WIDTH - 2 * marginAroundFocused;
  const styles = createStyleSheet(theme, TAB_BAR_WIDTH, TAB_WIDTH, focusedWidth);

  const translateAnimation = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(TAB_WIDTH * state.index) }]
  }));

  const changeIconColor = (xml: string | undefined, isFocused: boolean): string => {
    if (!xml) return '';
    const color = isFocused ? theme.colors.white : theme.colors.iconDefaultColor;
    return xml.replaceAll(/stroke="[^"]+"/g, `stroke="${color}"`);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animation, translateAnimation]}>
        <View style={styles.focused} />
      </Animated.View>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key
          });
        };

        const tabItem = getTabIcon(route.name);

        return (
          <Pressable
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
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

const createStyleSheet = (theme: Theme, tabBarWidth: number, tabWidth: number, focusedWidth: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      height: 70,
      width: tabBarWidth,
      position: 'absolute',
      bottom: 0,
      backgroundColor: theme.colors.background,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10
    },
    tabItem: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8
      // marginBottom: 10
    },
    animation: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      justifyContent: 'center',
      width: tabWidth
      // marginBottom: 10
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
