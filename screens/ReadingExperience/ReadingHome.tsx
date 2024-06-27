import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PrimaryButton, SecondaryButton } from '../../components';
import { utilities } from '../../styles';
import { RootStackParamList } from '../../routes';
import { handleUploadBook } from './util';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ReadingHome'>;

export const ReadingHome = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={[utilities.mt_5, utilities.p_5, utilities.gap_2]}>
      <PrimaryButton title="Upload a book" onPress={handleUploadBook} />
      <SecondaryButton title="Book List" onPress={() => navigation.navigate('BookList')} />
    </View>
  );
};
