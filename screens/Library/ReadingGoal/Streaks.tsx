import React, { useState } from 'react';
import { EvilIcons } from '@expo/vector-icons';
import { Modal, StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { BodyText, HeadingLarge, PrimaryButton } from '../../../components';
import { streakSvg } from '../../../assets/svg';
import { Theme, useTheme } from '../../../styles';
import { dummyStreakDays } from '../../../utils';
import { StreakDays } from './StreakDays';

export const Streaks = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);

  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.modalContainer}>
        <EvilIcons name="share-google" size={40} color={theme.colors.shareIconColor} />
        <View style={[utils.align_items_center, utils.gap_2, utils.mt_5]}>
          <SvgXml xml={streakSvg(3, theme.colors.background)} />
          <HeadingLarge bold>days streak!</HeadingLarge>
        </View>
        <View style={styles.dayStreaks}>
          <View style={[utils.flex_dir_row, utils.gap_1]}>
            {dummyStreakDays.map((streak, index) => (
              <StreakDays key={index} day={streak.day} completed={streak.completed} />
            ))}
          </View>
          <View style={styles.hr} />
          <View style={utils.px_4}>
            <BodyText style={[utils.text_center, utils.px_4]}>
              You did it ! Reading daily enables you to reach your goal 10x faster .
            </BodyText>
          </View>
        </View>
        <View style={styles.button}>
          <PrimaryButton title="Continue" />
        </View>
      </View>
    </Modal>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    modalContainer: {
      marginTop: 70,
      paddingHorizontal: 16
    },
    dayStreaks: {
      height: 145,
      borderWidth: 1,
      borderRadius: 20,
      borderColor: theme.colors.border,
      marginTop: 40,
      paddingTop: 32,
      paddingBottom: 20,
      alignItems: 'center',
      justifyContent: 'center'
    },
    hr: {
      width: '100%',
      borderWidth: 1,
      borderColor: theme.colors.border,
      marginVertical: 12
    },
    button: {
      width: '50%',
      alignSelf: 'center',
      marginTop: 70
    }
  });
