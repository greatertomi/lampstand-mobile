import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { View, StyleSheet, ScrollView, Modal, TouchableWithoutFeedback } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';

import { BodyTextLarge, DropdownPicker, PressableItem } from '../../../components';
import { Theme, useTheme } from '../../../styles';
import { ICON_SIZE, todayDate } from '../../../utils';
import { SettingContainer } from '../SettingContainer';

import { BookAuthors } from './BookAuthors';
import { BooksInProgress } from './BooksInProgress';
import { dates, dateToFilter } from './dummyData';
import { ReadingSpeed } from './ReadingSpeed';
import { SingleDate } from './SingleDate';
import { StatCard } from './StatCard';
import { TitleAndDesc } from './TitleAndDesc';
import { SelectedDateType } from './types';

export const Analytics = () => {
  const [filterSelectedDate, setFilterSelectedDate] = useState<SelectedDateType>('last_Seven_days');
  const [pickedDate, setPickedDate] = useState<DateData | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isCalenderVisible, setIsCalenderVisible] = useState<boolean>(false);
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);

  const calendarTheme = {
    todayTextColor: theme.colors.primary,
    arrowColor: theme.colors.primary
  };

  return (
    <ScrollView>
      <SettingContainer title="Reading Analytics">
        <View style={utils.gap_3}>
          <View style={styles.parent}>
            <View style={styles.child}>
              <BodyTextLarge bold>{todayDate(pickedDate?.dateString)}</BodyTextLarge>
              <View style={styles.pickerWrapper}>
                <DropdownPicker
                  value={filterSelectedDate}
                  data={dateToFilter}
                  onChange={(item) => setFilterSelectedDate(item.value as SelectedDateType)}
                  borderSize="lg"
                  dropdownStyles={styles.picker}
                />
                <PressableItem style={[utils.p_relative]} onPress={() => setIsCalenderVisible(true)}>
                  <AntDesign name="calendar" size={ICON_SIZE} style={styles.datePicker} />
                </PressableItem>
              </View>
            </View>
            <Modal
              visible={isCalenderVisible}
              transparent
              animationType="fade"
              onRequestClose={() => setIsCalenderVisible(false)}
            >
              <TouchableWithoutFeedback onPress={() => setIsCalenderVisible(false)}>
                <View style={styles.modalBackground}>
                  <View style={styles.calendarContainer}>
                    <Calendar
                      style={styles.calendar}
                      onDayPress={(day: DateData) => {
                        setPickedDate(day);
                        setIsCalenderVisible(false);
                      }}
                      theme={calendarTheme}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
            <View style={[utils.flex_dir_row, utils.width_100, utils.justify_content_between]}>
              {dates.map((date, index) => (
                <SingleDate
                  key={index}
                  day={date.day}
                  num={date.num}
                  isSelected={selectedIndex === index}
                  onPress={() => setSelectedIndex(index)}
                />
              ))}
            </View>
          </View>
          <TitleAndDesc title="Overall Reading Stats" description="Reading stats track books and pages achieved." />
          <View style={utils.gap_2}>
            <TitleAndDesc title="Reading Report" description="Reading stats track books and pages achieved." />
            <StatCard />
          </View>
          <View style={utils.gap_2}>
            <TitleAndDesc title="Reading In Progress" description="Here’s a list of fiction and non-fiction genres" />
            <BooksInProgress />
          </View>

          <View style={utils.gap_2}>
            <TitleAndDesc title="Reading Speed" description="Here’s a list of fiction and non-fiction genres" />
            <ReadingSpeed />
          </View>
          <View style={utils.gap_2}>
            <TitleAndDesc title="Favourite Authors" description="Here’s a list of fiction and non-fiction genres" />
            <BookAuthors />
          </View>
        </View>
      </SettingContainer>
    </ScrollView>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    parent: {
      gap: 8,
      backgroundColor: theme.colors.cardBackground,
      borderRadius: 10,
      paddingBottom: 10,
      paddingHorizontal: 10
    },
    child: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    calendarIcon: {
      borderWidth: 1,
      borderRadius: 5,
      borderColor: theme.colors.border,
      paddingVertical: 2,
      paddingHorizontal: 8
    },
    pickerWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8
    },
    picker: {
      width: 150,
      height: 38,
      top: -6,
      alignSelf: 'center'
    },
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
    },
    datePicker: {
      color: theme.colors.text,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: theme.colors.border,
      padding: 2
    }
  });
