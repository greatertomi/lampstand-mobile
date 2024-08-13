import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Dispatch, SetStateAction } from 'react';
import { Theme, useTheme } from '../../styles';
import { BodyText, HeadingSmall, LinkText } from '../../components';
import { achievement } from '../../assets';
import { UploadedBook } from '../../store/database/types';
import { replaceBook } from '../../store/database';

interface BookSuccessProps {
  book: UploadedBook | null;
  uploadSuccess: boolean;
  uploadDuplicate: boolean;
  setUploadSuccess: Dispatch<SetStateAction<boolean>>;
  setUploadDuplicate: Dispatch<SetStateAction<boolean>>;
}

export const BookToast = ({
  book,
  uploadSuccess,
  uploadDuplicate,
  setUploadSuccess,
  setUploadDuplicate
}: BookSuccessProps) => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStylesheet(theme);

  return (
    <>
      {uploadSuccess && (
        <Modal transparent visible={uploadSuccess} animationType="fade" onRequestClose={() => setUploadSuccess(false)}>
          <Pressable style={styles.overlay} onPress={() => setUploadSuccess(false)}>
            <View style={styles.container}>
              <HeadingSmall bold>Book added to Library</HeadingSmall>
              <SvgXml xml={achievement} width={100} height={98} />
            </View>
          </Pressable>
        </Modal>
      )}
      {uploadDuplicate && book && (
        <Modal transparent visible={uploadDuplicate} animationType="fade">
          <Pressable style={styles.overlay} onPress={() => setUploadDuplicate(false)}>
            <View style={styles.duplicateContainer}>
              <View style={[utils.gap_1, utils.align_items_center]}>
                <HeadingSmall bold>Replace Existing Items?</HeadingSmall>
                <BodyText>{`The book ${book.title} already exists`}</BodyText>
              </View>
              <View style={[utils.gap_2, utils.width_100, utils.mt_3]}>
                <View style={styles.hr} />
                <LinkText
                  onPress={async () => {
                    await replaceBook(book).then(() => {
                      setUploadDuplicate(false);
                      setUploadSuccess(true);
                      setTimeout(() => setUploadSuccess(false), 4000);
                    });
                  }}
                  style={utils.text_center}
                  size="large"
                  variant="primary"
                >
                  Replace
                </LinkText>
                <View style={styles.hr} />
                <LinkText
                  onPress={() => setUploadDuplicate(false)}
                  style={utils.text_center}
                  size="large"
                  variant="primary"
                >
                  Discard
                </LinkText>
              </View>
            </View>
          </Pressable>
        </Modal>
      )}
    </>
  );
};

const createStylesheet = (theme: Theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    container: {
      width: 228,
      height: 200,
      justifyContent: 'center',
      gap: 16,
      backgroundColor: theme.colors.background,
      borderRadius: 24,
      alignItems: 'center',
      elevation: 5
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
