import React, { useState } from 'react';
import { Calendar, DateData } from 'react-native-calendars';
import { Theme, useTheme } from '../../styles';
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

type DateCalendarProps = {
  onDayPress: (day: DateData) => void;
  visible: boolean;
  onClose: () => void;
};

export const DateCalendar = ({ onDayPress, visible, onClose }: DateCalendarProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  const [currentDate, setCurrentDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const calendarTheme = {
    todayTextColor: theme.colors.primary,
    arrowColor: theme.colors.primary
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground}>
          <View style={styles.calendarContainer}>
            <Calendar
              style={styles.calendar}
              onDayPress={onDayPress}
              theme={calendarTheme}
              enableSwipeMonths
              current={currentDate}
              allowSelectionOutOfRange
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    modalBackground: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.colors.overlayBackground,
      justifyContent: 'center',
      alignItems: 'center'
    },
    calendarContainer: {
      backgroundColor: theme.colors.background,
      borderRadius: 10,
      padding: 10
    },
    calendar: {
      width: 350
    }
  });
