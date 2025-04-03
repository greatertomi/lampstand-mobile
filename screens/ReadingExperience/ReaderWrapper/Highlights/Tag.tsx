import { ReactNode } from 'react';

import { BodyTextSmall, PressableItem } from '../../../../components';
import { Theme, useTheme } from '../../../../styles';

type TagProps = {
  children: ReactNode;
  isActive: boolean;
  onPress: () => void;
};

export const Tag = ({ children, isActive, onPress }: TagProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme, isActive);

  return (
    <PressableItem style={styles.tagContainer} onPress={onPress}>
      <BodyTextSmall style={styles.text}>{children}</BodyTextSmall>
    </PressableItem>
  );
};

const createStyleSheet = (theme: Theme, isActive: boolean) => ({
  tagContainer: {
    backgroundColor: isActive ? theme.colors.primary : theme.colors.inactiveButtonColor,
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  text: {
    color: isActive ? theme.colors.white : theme.colors.text
  }
});
