import { GestureResponderEvent, PressableProps, StyleProp, ViewStyle } from 'react-native';
import { BookType } from '../../customTypes';

export type OverviewProps = BookType & {
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
} & PressableProps;
