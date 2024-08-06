import React from 'react';
import { Text, View, Image } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes';
import { PrimaryButton } from '../../components';
import { useBookRenderer } from '../../hooks';

type BookDetailsRouteProp = RouteProp<RootStackParamList, 'BookDetails'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'BookDetails'>;

export const BookDetails = () => {
  const route = useRoute<BookDetailsRouteProp>();
  const navigation = useNavigation<NavigationProp>();

  const { bookPath } = route.params;
  const { metadata, image } = useBookRenderer(bookPath);

  return (
    <View>
      <PrimaryButton
        title="Read book Webview"
        onPress={() => navigation.navigate('BookContentList', { bookPath })}
        style={{ width: 150, marginBottom: 10 }}
      />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      {metadata && <Text>{JSON.stringify(metadata, null, 2)}</Text>}
    </View>
  );
};
