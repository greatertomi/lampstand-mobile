import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import useSWRMutation from 'swr/mutation';

import { apiService, endpoints, parseHttpError } from '../../api';
import { BodyText, BodyTextLarge, ConfirmationDialog } from '../../components';
import { ScreenNavigation } from '../../routes';
import { useAuthState, useNotificationState } from '../../store';
import { Theme, useTheme, utilities } from '../../styles';
import { multiRemoveLocalStorageItem } from '../../utils';

import { SettingContainer } from './SettingContainer';

export const DeleteAccount = () => {
  const { theme } = useTheme();
  const styles = createStylesheet(theme);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { setToken, setUser, setIsAuthenticated } = useAuthState();
  const { addNotification } = useNotificationState();

  const navigation = useNavigation<ScreenNavigation<'ProfileSettings' | 'Login'>>();

  const deleteActions = [
    'Log you out',
    'Remove all your saved books',
    'Delete your reading goals',
    'Erase your reading logs and history'
  ];

  const { trigger: handleAccountDeletion } = useSWRMutation(endpoints.deleteAccount, async (url) => {
    const response = await apiService.delete(url);
    return response.data;
  });

  const handleConfirmDelete = async () => {
    try {
      await handleAccountDeletion();
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      await multiRemoveLocalStorageItem(['token', 'user']);
      setIsModalVisible(false);
      navigation.navigate('MyBooks');
    } catch (error) {
      setIsModalVisible(false);
      addNotification({
        id: Date.now().toString(),
        message: parseHttpError(error).message,
        type: 'error'
      });
    }
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };

  return (
    <SettingContainer
      title="Delete Account"
      useButton
      buttonTitle="Delete my Account"
      onPress={() => setIsModalVisible(true)}
    >
      <View style={styles.container}>
        <BodyTextLarge bold>Deleting your account will:</BodyTextLarge>
        <View>
          {deleteActions.map((text, index) => (
            <View key={index} style={[utilities.flex_dir_row, utilities.align_items_center]}>
              <Entypo name="dot-single" size={24} color={theme.colors.tertiaryText} />
              <BodyText variant="tertiary" key={index}>
                {text}
              </BodyText>
            </View>
          ))}
        </View>
        <ConfirmationDialog
          isVisible={isModalVisible}
          onClose={handleCancelDelete}
          onOkay={handleConfirmDelete}
          title="Are you sure you want to delete your account?"
          description="This action cannot be undone. All your data will be permanently deleted."
          okayButtonText="Delete Account"
        />
      </View>
    </SettingContainer>
  );
};

const createStylesheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      padding: 24,
      borderRadius: 10,
      gap: 8,
      backgroundColor: theme.colors.cardBackground
    }
  });
