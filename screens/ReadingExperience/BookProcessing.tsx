import React, { useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../routes';
import { processEpubFile } from './util';

type BookProcessingRouteProp = RouteProp<RootStackParamList, 'BookProcessing'>;

interface Metadata {
  [key: string]: unknown;
}

const cleanMetadataKeys = (obj: Metadata): Metadata => {
  const cleanObj: Metadata = {};

  Object.keys(obj).forEach((key) => {
    const cleanKey = key.replaceAll(/@_|dc:|#|opf:|xmlns:/g, '');
    cleanObj[cleanKey] =
      typeof obj[key] === 'object' && obj[key] !== null ? cleanMetadataKeys(obj[key] as Metadata) : obj[key];
  });

  return cleanObj;
};

export const BookProcessing = () => {
  const route = useRoute<BookProcessingRouteProp>();
  const { bookPath } = route.params;
  const [image, setImage] = React.useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { metadata, manifest, zipFile } = await processEpubFile(bookPath);

      const cleanMetadata = cleanMetadataKeys(metadata);
      console.log(cleanMetadata);

      const coverImage = manifest.find((item: any) => item['@_id'] === 'cover-image' || item['@_id'] === 'cover');
      const imageHref = coverImage['@_href'];

      const coverImageFile = zipFile.file(`${imageHref}`);
      if (!coverImageFile) {
        throw new Error(`Cover image file not found: ${imageHref}`);
      }

      const coverImageData = await coverImageFile.async('base64');

      setImage(`data:image/jpeg;base64,${coverImageData}`);
    };

    fetchData();
  }, [bookPath]);

  return (
    <View>
      <Text>Book Processing</Text>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
};
