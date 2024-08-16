import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { Theme, useTheme } from '../../styles';
import { BodyText, HeadingSmall, LinkText } from '../../components';
import { logger } from '../../utils';

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
        <Pressable style={styles.overlay} onPress={() => logger.info('Pressable Click')}>
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
        </Pressable>
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
