import { GestureResponderEvent, PressableProps, StyleProp, ViewStyle } from 'react-native';

import { UploadedBook } from '../../store';

export type OverviewProps = UploadedBook & {
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
} & PressableProps;
