import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';

import { updatePasswordSuccess } from '../../assets';
import { MessagePopUp } from '../../components';
import { RouteNavigation, ScreenNavigation } from '../../routes';
import { useTheme } from '../../styles';

export const SupportSuccess = () => {
  const navigation = useNavigation<ScreenNavigation<'Settings'>>();
  const route = useRoute<RouteNavigation<'SupportSuccess'>>();
  const { message, description } = route.params;
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, paddingHorizontal: 16, backgroundColor: theme.colors.background }}>
      <MessagePopUp
        svg={updatePasswordSuccess}
        buttonTitle="Done"
        message={message}
        description={description}
        descriptionVariant="secondary"
        onPress={() => navigation.navigate('FAQ')}
      />
    </View>
  );
};
