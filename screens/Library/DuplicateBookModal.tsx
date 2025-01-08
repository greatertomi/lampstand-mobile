import { Modal, StyleSheet, View } from 'react-native';

import { BodyText, HeadingSmall, LinkText, PressableItem } from '../../components';
import { Theme, useTheme } from '../../styles';

// TODO: Create handler functions without passing states
interface BookSuccessProps {
  bookTitle?: string;
  onDiscard: () => void;
  onReplace: () => void;
}

export const DuplicateBookModal = ({ bookTitle, onDiscard, onReplace }: BookSuccessProps) => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStylesheet(theme);

  return (
    <View>
      <Modal transparent animationType="fade">
        <PressableItem style={styles.overlay} onPress={onDiscard}>
          <View style={styles.duplicateContainer}>
            <View style={[utils.gap_1, utils.align_items_center, utils.px_2]}>
              <HeadingSmall bold>Replace Existing Items?</HeadingSmall>
              <BodyText>{`The book ${bookTitle} already exists`}</BodyText>
            </View>
            <View style={[utils.gap_2, utils.width_100, utils.mt_3]}>
              <View style={styles.hr} />
              <LinkText onPress={onReplace} style={utils.text_center} size="large" variant="primary">
                Replace
              </LinkText>
              <View style={styles.hr} />
              <LinkText onPress={onDiscard} style={utils.text_center} size="large" variant="primary">
                Discard
              </LinkText>
            </View>
          </View>
        </PressableItem>
      </Modal>
    </View>
  );
};

const createStylesheet = (theme: Theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    duplicateContainer: {
      width: 300,
      backgroundColor: theme.colors.background,
      borderRadius: 24,
      paddingVertical: 30,
      elevation: 5
    },
    hr: {
      width: '100%',
      borderWidth: 0.5,
      borderColor: theme.colors.border
    }
  });
