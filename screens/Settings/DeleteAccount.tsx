import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import useSWRMutation from 'swr/mutation';

import { apiService, endpoints } from '../../api';
import { BodyText, BodyTextLarge, CustomModal, HeadingMedium, PrimaryButton } from '../../components';
import { ScreenNavigation } from '../../routes';
import { useAuthState } from '../../store';
import { Theme, useTheme, utilities } from '../../styles';
import { logger, multiRemoveLocalStorageItem } from '../../utils';

import { SettingContainer } from './SettingContainer';

export const DeleteAccount = () => {
  const { theme } = useTheme();
  const styles = createStylesheet(theme);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { setToken, setUser, setIsAuthenticated } = useAuthState();
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
    const data = await handleAccountDeletion();
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    await multiRemoveLocalStorageItem(['token', 'user']);
    logger.info(`${data.message}`);
    setIsModalVisible(false);
    navigation.navigate('MyBooks');
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
              <Entypo name="dot-single" size={24} color={theme.colors.deleteText} />
              <BodyText style={{ color: theme.colors.deleteText }} key={index}>
                {text}
              </BodyText>
            </View>
          ))}
        </View>
        {isModalVisible && (
          <CustomModal
            onClose={handleCancelDelete}
            footer={
              <View style={styles.modalButton}>
                <PrimaryButton
                  title="Cancel"
                  onPress={handleCancelDelete}
                  style={styles.buttonStyles}
                  variant="transparent"
                />
                <PrimaryButton title="Delete Account" onPress={handleConfirmDelete} style={styles.buttonStyles} />
              </View>
            }
            modalContainerStyle={styles.modalContainer}
          >
            <HeadingMedium bold>Delete Account</HeadingMedium>
            <BodyText style={styles.modalText}>Are you sure you want to delete your account?</BodyText>
          </CustomModal>
        )}
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
    },
    modalText: {
      color: theme.colors.deleteText,
      marginTop: 18
    },
    modalButton: {
      flexDirection: 'row',
      marginTop: 20,
      gap: 10
    },
    buttonStyles: {
      flex: 1
    },
    modalContainer: {
      alignItems: 'flex-start',
      paddingHorizontal: 15
    }
  });
