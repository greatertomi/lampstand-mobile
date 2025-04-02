import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, View } from 'react-native';

import { BodyText, PressableItem, TagText, ThreeDots } from '../../../../components';
import { Highlight, useReader } from '../../../../package/epub-reader';
import { Theme, useTheme } from '../../../../styles';

import { formatTimestamp } from './utils';

export const HighlightTexts = ({ highlights }: { highlights: Highlight[] }) => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);
  const navigation = useNavigation();
  const { removeHighlightedText, goToLocation } = useReader();

  return (
    <ScrollView style={styles.wrapper}>
      {highlights.map((highlight, index) => (
        <PressableItem
          key={index}
          style={[styles.frame, index !== highlights.length - 1 && styles.underline]}
          onPress={() => {
            goToLocation(highlight.cfiRange);
            navigation.goBack();
          }}
        >
          <View style={[utils.mr_3, utils.justify_content_center]}>
            <BodyText
              bold
              style={[styles.highlightText, { backgroundColor: highlight.colour }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {highlight.text}
            </BodyText>
            <TagText style={styles.date}>{formatTimestamp(highlight.id)}</TagText>
          </View>
          <View style={utils.align_self_end}>
            <ThreeDots vertical onPress={() => removeHighlightedText(highlight)} />
          </View>
        </PressableItem>
      ))}
    </ScrollView>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    wrapper: {
      backgroundColor: theme.colors.background
    },
    frame: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingHorizontal: 10,
      marginHorizontal: 10,
      paddingVertical: 13,
      marginVertical: 4
    },
    highlightText: {
      padding: 2
    },
    underline: {
      borderBottomColor: theme.colors.inactiveButtonColor,
      borderBottomWidth: 1
    },
    date: {
      color: theme.colors.secondaryText,
      marginTop: 2
    }
  });
