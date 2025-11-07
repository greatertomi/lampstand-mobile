import { StyleSheet, View } from 'react-native';

import { Theme } from '../../styles';
import { logger } from '../../utils';
import { BodyTextSmall } from '../Typography';

interface UpdateStatusViewProps {
  isLoading: boolean;
  error: unknown;
  theme: Theme;
}

export const UpdateStatusView = ({ isLoading, error, theme }: UpdateStatusViewProps) => {
  if (isLoading) {
    // Small, non-blocking indicator
    return (
      <View style={statusStyles.container}>
        <BodyTextSmall style={{ color: theme.colors.secondaryText }}>Checking for updates...</BodyTextSmall>
      </View>
    );
  }

  if (error) {
    logger.warn('Version check failed', error);
    return (
      <View style={statusStyles.container}>
        <BodyTextSmall style={{ color: theme.colors.error }}>Update check failed.</BodyTextSmall>
      </View>
    );
  }

  return null;
};

const statusStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginTop: 10
  }
});
