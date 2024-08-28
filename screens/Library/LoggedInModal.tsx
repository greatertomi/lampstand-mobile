import React, { useState } from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { BodyText, PrimaryButton, OutlinedButton } from '../../components';
import { Theme, useTheme, utilities } from '../../styles';

export const LoggedInModal = () => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const [isVisible, setIsVisible] = useState(true);

  return (
    <Modal animationType="slide" transparent visible={isVisible}>
      <Pressable
        style={styles.overlay}
        onPress={() => {
          setIsVisible(isVisible);
        }}
      />
      <View style={styles.modalContent}>
        <Image style={styles.image} source={require('../../assets/images/readingTime.png')} />
        <View style={[utilities.align_self_center, utilities.mt_n4]}>
          <Text style={styles.timeToRead}>Time to read!!</Text>
          <BodyText>Set your Goal to track your reading.</BodyText>
        </View>
        <View style={utilities.gap_1}>
          <PrimaryButton title="Set Goal" />
          <OutlinedButton title="No Later" />
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
