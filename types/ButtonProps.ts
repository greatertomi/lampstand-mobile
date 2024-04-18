export type ButtonProps = {
  title: string;
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isDisabled?: boolean;
  isFocused?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
