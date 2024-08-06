import { GestureResponderEvent, PressableProps, StyleProp, ViewStyle } from 'react-native';
import { BookType } from '../../types';

export type OverviewProps = BookType & {
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
} & PressableProps;
