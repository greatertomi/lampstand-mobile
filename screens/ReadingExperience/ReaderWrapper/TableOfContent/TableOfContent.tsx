import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { BodyText, PressableItem } from '../../../../components';
import { useReader } from '../../../../package/epub-reader';
import { ScreenNavigation } from '../../../../routes';
import { SettingContainer } from '../../../Settings';

export const TableOfContent = () => {
  const navigation = useNavigation<ScreenNavigation<'Reader'>>();
  const { toc, goToChapter } = useReader();

  return (
    <SettingContainer title="Contents">
      <ScrollView>
        {toc.length > 0 ? (
          toc.map((item, index) => (
            <PressableItem
              key={index}
              onPress={() => {
                goToChapter(item.href);
                navigation.goBack();
              }}
              style={styles.contentItem}
            >
              <BodyText>{item.label.trim()}</BodyText>
            </PressableItem>
          ))
        ) : (
          <BodyText>No table of content available</BodyText>
        )}
      </ScrollView>
    </SettingContainer>
  );
};

const styles = StyleSheet.create({
  contentItem: {
    padding: 8
  }
});
