import React, { useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import JSZip from 'jszip';
import { RootStackParamList } from '../../routes';
import { processEpubFile } from './util';

type BookProcessingRouteProp = RouteProp<RootStackParamList, 'BookProcessing'>;

interface Metadata {
  [key: string]: unknown;
}

interface EpubManifestItem {
  '@_id': string;
  '@_href': string;
  '@_media-type': string;
}

interface ManifestItem {
  id: string;
  href: string;
  mediaType: string;
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

const cleanManifestKeys = (manifest: EpubManifestItem[]): ManifestItem[] =>
  manifest.map((item) => ({
    id: item['@_id'],
    href: item['@_href'],
    mediaType: item['@_media-type']
  }));

const getBookImage = async (manifest: ManifestItem[], zipFile?: JSZip): Promise<string | null> => {
  let coverImageFile;
  const coverImagePath = manifest.find((item) => item.id === 'cover-image' || item.id === 'cover')?.href;
  coverImageFile = zipFile?.file(`${coverImagePath}`);

  if (!coverImageFile && zipFile) {
    const secondaryCoverImagePath = Object.keys(zipFile.files).find((key) => /cover.*\.(jpg|png)/.test(key));
    coverImageFile = zipFile.file(`${secondaryCoverImagePath}`);
  }

  if (!coverImageFile) {
    return null;
  }

  const coverImageData = await coverImageFile?.async('base64');
  return `data:image/jpeg;base64,${coverImageData}`;
};

export const BookProcessing = () => {
  const route = useRoute<BookProcessingRouteProp>();
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
      <Text>Book Processing</Text>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      {bookMetadata && <Text>{JSON.stringify(bookMetadata, null, 2)}</Text>}
    </View>
  );
};
