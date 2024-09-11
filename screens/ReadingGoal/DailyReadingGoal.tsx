import React, { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { HeadingMedium, PrimaryButton, DropdownPicker } from '../../components';
import { dailyReminder, dummyDailyReadingGoals } from '../../utils';
import { Theme, useTheme, utilities } from '../../styles';

type DailyReadingGoalProps = {
  show: boolean;
  onClose: () => void;
};

export const DailyReadingGoal = ({ show, onClose }: DailyReadingGoalProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const [isVisible, setIsVisible] = useState(show);
  const [timeValue, setTimeValue] = useState<string>('');
  const [rememberMeValue, setRememberMeValue] = useState<string>('');

  useEffect(() => {
    setIsVisible(show);
  }, [show]);

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
        <Pressable
          onPress={() => {
            setIsVisible(!isVisible);
            onClose();
          }}
        >
          <View style={styles.line} />
        </Pressable>
        <View style={styles.content}>
          <HeadingMedium bold style={utilities.text_center}>
            Daily Reading Goal
          </HeadingMedium>
          <View style={[utilities.gap_2, utilities.mt_4]}>
            <DropdownPicker
              label="Set your Goal"
              data={dummyDailyReadingGoals}
              value={timeValue}
              onChange={(item) => setTimeValue(item.value)}
            />
            <DropdownPicker
              label="Set Reminder"
              data={dailyReminder}
              value={rememberMeValue}
              onChange={(item) => setRememberMeValue(item.value)}
            />
          </View>
          <View style={styles.button}>
            <PrimaryButton title="Save Goal" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: theme.colors.modalOverlayBackground,
      opacity: 0.2
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
    content: {
      marginVertical: 30
    },
    button: {
      width: '50%',
      alignSelf: 'center',
      marginTop: 50
    },
    line: {
      width: 40,
      height: 5,
      marginTop: 15,
      alignSelf: 'center',
      borderRadius: 10,
      backgroundColor: theme.colors.secondaryText
    }
  });
