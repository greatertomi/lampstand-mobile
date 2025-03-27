import { useFileSystem } from '@epubjs-react-native/expo-file-system';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import { logger } from '../../utils';

import { LoadingFile } from './components/Loaders';
import { jszip, epubjs } from './lib';
import { ReaderProps } from './types';
import { useInjectWebViewVariables } from './useInjectWebViewVariables';
import { getSourceName, getSourceType, isFsUri, isURL } from './utils/helpers';
import { View } from './View';

export const EpubReader = ({
  src,
  width = '100%',
  height = '100%',
  initialLocations,
  allowScriptedContent = Platform.OS === 'ios',
  onPressExternalLink,
  renderLoadingFileComponent = (props) => <LoadingFile {...props} width={width} height={height} />,
  menuItems,
  manager = 'default',
  flow = 'auto',
  snap,
  spread,
  fullsize,
  initialState,
  theme,
  ...rest
}: ReaderProps) => {
  const {
    downloadFile,
    size: fileSize,
    progress: downloadProgress,
    success: isDownloadSuccess,
    error: downloadError,
    documentDirectory,
    writeAsStringAsync
  } = useFileSystem();
  const { injectWebViewVariables } = useInjectWebViewVariables();
  const [isLoading, setIsLoading] = useState(true);
  const [template, setTemplate] = useState<string | null>(null);
  const [templateUrl, setTemplateUrl] = useState<string | null>(null);
  const [allowedUris, setAllowedUris] = useState<string | null>(null);

  const hasEnableSelection = menuItems ? true : rest.enableSelection || false;
  const canAllowPopups = onPressExternalLink ? true : rest.allowPopups || false;

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const jszipFileUri = `${documentDirectory}/jszip.min.js`;
      const epubjsFileUri = `${documentDirectory}/epub.min.js`;

      try {
        await writeAsStringAsync(jszipFileUri, jszip);
      } catch {
        logger.error('Failed to write jszip file');
        return;
      }

      try {
        await writeAsStringAsync(epubjsFileUri, epubjs);
      } catch {
        logger.error('Failed to write epubjs file');
        return;
      }

      const sourceType = getSourceType(src);
      const isExternalSource = isURL(src);
      const isSrcInFs = isFsUri(src);

      if (!sourceType) {
        throw new Error(`Invalid source type: ${src}`);
      }

      const sharedWebVariables = {
        jszip: jszipFileUri,
        epubjs: epubjsFileUri,
        book: src,
        type: sourceType,
        locations: initialLocations,
        hasEnableSelection,
        allowScriptedContent,
        canAllowPopups,
        manager,
        flow,
        snap,
        spread,
        fullsize
      };

      if (isExternalSource) {
        const sourceName = getSourceName(src);
        if (!sourceName) {
          throw new Error(`Invalid source name: ${src}`);
        }

        const { uri: bookFileUri } = await downloadFile(src, sourceName);

        if (!bookFileUri) throw new Error("Couldn't download book");

        setAllowedUris(`${bookFileUri},${jszipFileUri},${epubjsFileUri}`);

        setTemplate(
          injectWebViewVariables({
            ...sharedWebVariables,
            book: bookFileUri
          })
        );
      } else {
        setAllowedUris(isSrcInFs ? `${src},${jszipFileUri},${epubjsFileUri}` : `${jszipFileUri},${epubjsFileUri}`);
        setTemplate(injectWebViewVariables(sharedWebVariables));
      }
      setIsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    canAllowPopups,
    allowScriptedContent,
    documentDirectory,
    downloadFile,
    hasEnableSelection,
    initialLocations,
    injectWebViewVariables,
    setIsLoading,
    src
    // ! Causing unknown loop
    // writeAsStringAsync,
  ]);

  useEffect(() => {
    (async () => {
      try {
        if (template) {
          const content = template;
          const fileUri = `${documentDirectory}/index.html`;
          await writeAsStringAsync(fileUri, content);
          setTemplateUrl(fileUri);
        }
      } catch {
        throw new Error('Failed to write index file');
      }
    })();
  }, [documentDirectory, template, writeAsStringAsync]);

  if (!templateUrl || !allowedUris || isLoading) {
    return renderLoadingFileComponent({
      fileSize,
      downloadProgress,
      isDownloadSuccess,
      downloadError
    });
  }

  return (
    <View
      allowedUris={allowedUris}
      templateUri={templateUrl}
      width={width}
      height={height}
      onPressExternalLink={onPressExternalLink}
      enableSelection={hasEnableSelection}
      menuItems={menuItems}
      manager={manager}
      flow={flow}
      snap={snap}
      initialState={initialState}
      theme={theme}
      {...rest}
    />
  );
};
