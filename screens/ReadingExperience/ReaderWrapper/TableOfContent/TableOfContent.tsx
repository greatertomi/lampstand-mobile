import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView } from 'react-native';

import { BodyText, PressableItem } from '../../../../components';
import { useReader } from '../../../../packages/epub-reader';
import { ScreenNavigation } from '../../../../routes';
import { utilities } from '../../../../styles';
import { EmptyTab } from '../Highlights/EmptyTab';
import { ReaderSettingsContainer } from '../ReaderSettingsContainer';

export const TableOfContent = () => {
  const navigation = useNavigation<ScreenNavigation<'Reader'>>();
  const { toc, goToChapter } = useReader();

  if (!toc || toc.length === 0) {
    return (
      <ReaderSettingsContainer title="Contents">
        <EmptyTab
          label="No table of content available"
          desc="Table of content is not available now until the author provide one."
        />
      </ReaderSettingsContainer>
    );
  }

  return (
    <ReaderSettingsContainer title="Contents">
      <ScrollView>
        {toc.map((item, index) => (
          <PressableItem
            key={index}
            onPress={() => {
              goToChapter(item.href);
              navigation.goBack();
            }}
            style={utilities.p_1}
          >
            <BodyText>{item.label.trim()}</BodyText>
          </PressableItem>
        ))}
      </ScrollView>
    </ReaderSettingsContainer>
  );
};
