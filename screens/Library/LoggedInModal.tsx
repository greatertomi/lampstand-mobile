import React, { useState } from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { BodyText, PrimaryButton, SecondaryButton } from '../../components';
import { Theme, useTheme, utilities } from '../../styles';

type LoggedInModalProps = {
  show: boolean;
  onClose: () => void;
  setModalVisible: (value: boolean) => void;
};

export const LoggedInModal = ({ show, onClose, setModalVisible }: LoggedInModalProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const [isVisible, setIsVisible] = useState(show);

  return (
    <Modal animationType="slide" transparent visible={isVisible}>
      <Pressable
        style={styles.overlay}
        onPress={() => {
          setIsVisible(!isVisible);
          onClose();
        }}
      />
      <View style={styles.modalContent}>
        <Image
          style={styles.image}
          source={require('../../assets/images/readingTime.png')}
        />
        <View style={[utilities.align_self_center, utilities.mt_n4]}>
          <Text style={styles.timeToRead}>Time to read!!</Text>
          <BodyText>Set your Goal to track your reading.</BodyText>
        </View>
        <View style={utilities.gap_1}>
          <PrimaryButton
            title="Set Goal"
            onPress={() => {
              setModalVisible(!show);
              setIsVisible(!show);
            }}
          />
          <SecondaryButton title="No Later" />
        </View>
      </View>
    </Modal>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
    modalContent: {
      height: '52%',
      width: '100%',
      position: 'absolute',
      bottom: 0,
      backgroundColor: theme.colors.background,
      paddingHorizontal: 16,
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
      gap: 16
    },
    timeToRead: {
      textAlign: 'center',
      fontSize: 30,
      fontWeight: 'bold'
    },
    image: {
      width: 224,
      height: 224,
      alignSelf: 'center'
    }
  });
