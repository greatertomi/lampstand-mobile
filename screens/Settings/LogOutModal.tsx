import React from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BodyText, HeadingSmall, PrimaryButton, SecondaryButton } from '../../components';
import { useAuthState } from '../../store';
import { Theme, useTheme } from '../../styles';
import { RootStackParamList } from '../../routes';
import { multiRemoveLocalStorageItem } from '../../utils';

type LogOutModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

type NavigationScreens = NativeStackNavigationProp<RootStackParamList, 'ProfileSettings' | 'Login'>;

export const LogOutModal = ({ isVisible, onClose }: LogOutModalProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const utils = theme.utilities;
  const { user, setToken, setUser, setIsAuthenticated, isAuthenticated } = useAuthState();
  const navigation = useNavigation<NavigationScreens>();

  const handleLogout = async () => {
    setIsAuthenticated(!isAuthenticated);
    navigation.navigate('MyBooks');
    setToken(null);
    setUser(null);
    await multiRemoveLocalStorageItem(['token', 'user']);
    onClose();
  };

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={[styles.modalContainer, utils.gap_2]}>
          <View style={[utils.align_self_center, utils.gap_2]}>
            <HeadingSmall style={utils.text_center}>Log Out</HeadingSmall>
            <BodyText style={utils.width_75} variant="secondary">
              You are signed in as {user?.fullName}
            </BodyText>
          </View>
          <View>
            <View style={[utils.width_75, utils.align_self_center, utils.gap_1]}>
              <PrimaryButton title="Logout" onPress={handleLogout} />
              <SecondaryButton title="Cancel" onPress={onClose} />
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: theme.colors.overlayBackground,
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalContainer: {
      width: 310,
      padding: 20,
      backgroundColor: theme.colors.background,
      borderRadius: 10
    }
  });
