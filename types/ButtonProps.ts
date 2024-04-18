import { GestureResponderEvent } from 'react-native';

export type ButtonProps = {
  title: string;
  icon: React.ReactElement;
  type: string;
  onClick?: (event: GestureResponderEvent) => void;
};
