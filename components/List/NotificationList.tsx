import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BodyText } from '../Typography';
import { ToggleButton } from '../ToggleButton';
import { Theme, useTheme, utilities } from '../../styles';

export type NotificationListProps = {
  title: string;
  notifications: {
    name: string;
    value: boolean;
    type: string;
  }[];
  onValueChange: (name: string, value: boolean) => void;
};

export const NotificationList = ({ title, notifications, onValueChange }: NotificationListProps) => {
  const { theme } = useTheme();
  const styles = createsStyleSheet(theme);

  return (
    <View style={utilities.gap_1}>
      <BodyText variant="tertiary">{title}</BodyText>
      <View style={styles.listContainer}>
        {notifications.map((notification) => (
          <View key={notification.name} style={styles.toggle}>
            <BodyText>{notification.name}</BodyText>
            <ToggleButton
              onValueChange={(value) => onValueChange(notification.name, value)}
              isEnabled={notification.value}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const createsStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    listContainer: {
      backgroundColor: theme.colors.cardBackground,
      borderRadius: 10,
      padding: 8,
      paddingHorizontal: 16,
      paddingBottom: 16
    },
    toggle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      paddingVertical: 16
    }
  });
