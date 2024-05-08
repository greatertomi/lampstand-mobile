import React from 'react';
import { View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PrimaryButton } from '../../components';
import { utilities } from '../../styles';
import { RootStackParamList } from '../../routes/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ReadingHome'>;

export const ReadingHome = () => {
  const navigation = useNavigation<NavigationProp>();

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleUploadBook = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    // console.log(result.output);
    console.log(result);
    if (result.assets) {
      navigation.navigate('ReadingScreen', { bookPath: result.assets[0].uri });
    }
  };

  return (
    <View style={[utilities.mt_5, utilities.p_5, utilities.gap_2]}>
      <PrimaryButton title="Upload a book" onPress={handleUploadBook} />
    </View>
  );
};
