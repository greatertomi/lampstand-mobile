import { ScrollView, StyleSheet, View } from 'react-native';

import { BodyText, PressableItem, TagText, ThreeDots } from '../../../../components';
import { Highlight } from '../../../../package/epub-reader';
import { Theme, useTheme } from '../../../../styles';

import { formatTimestamp } from './utils';

export const HighlightTexts = ({ highlights }: { highlights: Highlight[] }) => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);

  return (
    <ScrollView style={styles.wrapper}>
      {highlights.map((highlight, index) => (
        <PressableItem key={index} style={[styles.frame, index !== highlights.length - 1 && styles.underline]}>
          <View style={utils.gap_1}>
            <BodyText
              bold
              style={{ backgroundColor: highlight.colour, padding: 2 }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {highlight.text}
            </BodyText>
            <TagText style={{ color: theme.colors.secondaryText }}>{formatTimestamp(highlight.id)}</TagText>
          </View>
          <ThreeDots vertical />
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
      alignItems: 'flex-end',
      paddingHorizontal: 10,
      marginHorizontal: 10,
      paddingVertical: 13,
      marginVertical: 4
    },
    underline: {
      borderBottomColor: theme.colors.inactiveButtonColor,
      borderBottomWidth: 1
    }
  });
