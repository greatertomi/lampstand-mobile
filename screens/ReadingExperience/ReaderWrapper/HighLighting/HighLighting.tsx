import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { moreColors } from '../../../../assets';
import { BodyText, PressableItem } from '../../../../components';
import { Theme, useTheme } from '../../../../styles';
import { SMALL_ICON_SIZE } from '../../../../utils';

const Circle = ({ color }: { color?: string }) => (
  <PressableItem style={{ backgroundColor: color, height: 24, width: 24, borderRadius: 50 }} />
);

export const HighLighting = () => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);

  return (
    <View style={styles.container}>
      <PressableItem>
        <View style={styles.line} />
      </PressableItem>
      <View style={styles.dialog}>
        <View style={[utils.flex_dir_row, utils.align_items_center, utils.gap_1, styles.colors]}>
          {theme.colors.highlightingColors.map((color, index) => (
            <Circle key={String(index)} color={color} />
          ))}
          <PressableItem>
            <SvgXml xml={moreColors} />
          </PressableItem>
        </View>
        <PressableItem style={[utils.align_items_center, utils.gap_1, styles.options]}>
          <Ionicons name="copy-outline" size={SMALL_ICON_SIZE} color={theme.colors.text} />
          <BodyText>Copy</BodyText>
        </PressableItem>
        <PressableItem style={[utils.align_items_center, utils.gap_1, styles.options]}>
          <AntDesign name="sharealt" size={SMALL_ICON_SIZE} color={theme.colors.text} />
          <BodyText>Share</BodyText>
        </PressableItem>
        <PressableItem style={[utils.align_items_center, utils.gap_1, styles.options]}>
          <MaterialCommunityIcons name="comment-text-outline" size={SMALL_ICON_SIZE} color={theme.colors.text} />
          <BodyText>Comment</BodyText>
        </PressableItem>
      </View>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      position: 'absolute',
      bottom: 0,
      borderRadius: 20,

      height: 124,
      width: '100%',
      backgroundColor: theme.colors.cardBackground
    },
    dialog: {
      paddingVertical: 20,
      paddingHorizontal: 19,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      alignSelf: 'center',
      gap: 8
    },
    line: {
      width: 40,
      height: 5,
      marginTop: 15,
      alignSelf: 'center',
      borderRadius: 10,
      backgroundColor: theme.colors.secondaryText
    },
    options: {
      padding: 8,
      borderRadius: 5,
      backgroundColor: theme.colors.highlightingBackground
    },

    colors: {
      paddingVertical: 13,
      paddingHorizontal: 10,
      borderRadius: 5,
      backgroundColor: theme.colors.highlightingBackground
    }
  });
