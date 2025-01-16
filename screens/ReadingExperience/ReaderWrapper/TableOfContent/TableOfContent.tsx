import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { BodyText, PressableItem } from '../../../../components';
import { useReader } from '../../../../package/epub-reader';
import { ScreenNavigation } from '../../../../routes';
import { utilities } from '../../../../styles';
import { SettingContainer } from '../../../Settings';

import { truncateText } from './trancateText';

export const TableOfContent = () => {
  const navigation = useNavigation<ScreenNavigation<'Reader'>>();
  const { toc, goToChapter } = useReader();

  return (
    <SettingContainer title="Contents">
      <View style={utilities.gap_3}>
        {toc.map((item, index) => (
          <PressableItem
            key={index}
            onPress={() => {
              goToChapter(item.href);
              navigation.goBack();
            }}
            style={styles.contentItem}
          >
            <BodyText>{truncateText(item.label)}</BodyText>
            <BodyText>page num</BodyText>
          </PressableItem>
        ))}
      </View>
    </SettingContainer>
  );
};

const styles = StyleSheet.create({
  contentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
