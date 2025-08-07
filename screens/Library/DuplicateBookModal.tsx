import { View, StyleSheet } from 'react-native';

import { BodyText, HeadingSmall, BottomSheet, SecondaryButton, PrimaryButton } from '../../components';
import { useTheme } from '../../styles';

interface BookSuccessProps {
  isVisible: boolean;
  bookTitle?: string;
  onDiscard: () => void;
  onReplace: () => void;
}

export const DuplicateBookModal = ({ isVisible, bookTitle, onDiscard, onReplace }: BookSuccessProps) => {
  const { theme } = useTheme();
  const utils = theme.utilities;

  return (
    <BottomSheet isVisible={isVisible} onClose={onDiscard} snapPoints={['35%']} enablePanDownToClose>
      <View style={[utils.gap_1, utils.align_items_center, utils.px_2]}>
        <HeadingSmall bold>Replace Existing Items?</HeadingSmall>
        <BodyText>{`The book ${bookTitle} already exists`}</BodyText>
      </View>
      <View style={styles.buttonContainer}>
        <SecondaryButton onPress={onReplace} title="Replace" block />
        <PrimaryButton onPress={onDiscard} title="Discard" block />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 10,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
