import React, { useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes';
import { cleanManifestKeys, cleanMetadataKeys, getBookImage, processEpubFile } from './util';
import { Metadata } from './types';
import { PrimaryButton } from '../../components';

type BookProcessingRouteProp = RouteProp<RootStackParamList, 'BookProcessing'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'BookProcessing'>;

export const BookProcessing = () => {
  const route = useRoute<BookProcessingRouteProp>();
  const navigation = useNavigation<NavigationProp>();

  const { bookPath } = route.params;
  const [image, setImage] = React.useState<string | null>(null);
  const [bookMetadata, setBookMetadata] = React.useState<Metadata | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { metadata, manifest, zipFile } = (await processEpubFile(bookPath)) || {};

      const cleanMetadata = cleanMetadataKeys(metadata);
      setBookMetadata(cleanMetadata);

      const cleanManifest = cleanManifestKeys(manifest);
      const bookImage = await getBookImage(cleanManifest, zipFile);
      setImage(bookImage);
    };

    fetchData();
  }, [bookPath]);

  return (
    <View>
      <PrimaryButton title="Read book" onPress={() => navigation.navigate('MarkdownReader')} style={{ width: 150 }} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      {bookMetadata && <Text>{JSON.stringify(bookMetadata, null, 2)}</Text>}
    </View>
  );
};
