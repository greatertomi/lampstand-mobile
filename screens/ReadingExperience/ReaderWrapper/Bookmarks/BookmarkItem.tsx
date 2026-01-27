import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

import { BodyText, BodyTextSmall, PressableItem } from '../../../../components';
import { useReader } from '../../../../packages/epub-reader';
import { Location } from '../../../../packages/types';
import { Theme, useTheme } from '../../../../styles';
import { ICON_SIZE } from '../../../../utils';
import { ContextMenu } from '../ContextMenu';
import { ContextMenuType } from '../types';

interface BookmarkItemProps {
  label: string;
  createdAt: string;
  location: Location;
  onDeleteBookmark: () => void;
}

export const BookmarkItem = ({ location, onDeleteBookmark, label, createdAt }: BookmarkItemProps) => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);
  const { goToLocation } = useReader();

  const navigation = useNavigation();

  const options: ContextMenuType[] = [
    {
      label: 'Delete Bookmark',
      icon: <MaterialCommunityIcons name="delete-outline" size={ICON_SIZE} color={theme.colors.primary} />,
      onPress: onDeleteBookmark
    }
  ];

  return (
    <View style={styles.sort}>
      <PressableItem
        onPress={() => {
          goToLocation(location?.start?.cfi);
          navigation.goBack();
        }}
        style={utils.flex}
      >
        <View style={utils.flex_shrink}>
          <BodyText style={styles.bookmark} ellipsizeMode="tail" numberOfLines={1}>
            {label || 'No label currently set'}
          </BodyText>
          <BodyTextSmall variant="secondary">{createdAt}</BodyTextSmall>
        </View>
      </PressableItem>
      <ContextMenu items={options} />
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    sort: {
      borderBottomColor: theme.colors.secondaryText,
      borderBottomWidth: 0.2,
      paddingVertical: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 16,
      alignItems: 'center'
    },
    bookmark: {
      marginBottom: 5
    }
  });
