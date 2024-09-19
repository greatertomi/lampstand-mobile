import React from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BodyText, HeadingSmall, PrimaryButton, SecondaryButton } from '../../components';
import { useAuthState } from '../../store';
import { Theme, useTheme } from '../../styles';
import { removeLocalStorageItems } from '../../utils';
import { RootStackParamList } from '../../routes';

type LogOutModalProps = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

type NavigationScreens = NativeStackNavigationProp<RootStackParamList, 'ProfileSettings' | 'Login'>;

export const LogOutModal = ({ setIsVisible, isVisible }: LogOutModalProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const utils = theme.utilities;
  const { user, setToken, setUser } = useAuthState();
  const navigation = useNavigation<NavigationScreens>();

  const handleLogout = async () => {
    setToken(null);
    setUser(null);
    await removeLocalStorageItems('user', 'token');
    setIsVisible(!isVisible);
    navigation.navigate('MyBooks');
  };

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <Pressable style={styles.overlay} onPress={() => setIsVisible(!isVisible)}>
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
              <SecondaryButton title="Cancel" onPress={() => setIsVisible(!isVisible)} />
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
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
