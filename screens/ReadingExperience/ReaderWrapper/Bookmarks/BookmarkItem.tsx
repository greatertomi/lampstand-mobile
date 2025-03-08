import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { BodyText, BodyTextSmall, Dialog, PreferenceList, PressableItem, ThreeDots } from '../../../../components';
import { Location, useReader } from '../../../../package/epub-reader';
import { Theme, useTheme } from '../../../../styles';
import { ICON_SIZE } from '../../../../utils';

type OptionsType = {
  title: string;
  icon: React.JSX.Element;
  variant?: 'primary' | 'secondary';
  onPress?: () => void;
};

interface BookmarkItemProps {
  label: string;
  createdAt: string;
  location: Location;
  onDeleteBookmark: () => void;
}

export const BookmarkItem = ({ location, onDeleteBookmark, label, createdAt }: BookmarkItemProps) => {
  const [shouldOpenOptions, setShouldOpenOptions] = useState(false);
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const { goToLocation } = useReader();
  const navigation = useNavigation();

  const options: OptionsType[] = [
    {
      title: 'Delete Bookmark',
      variant: 'primary',
      icon: <MaterialCommunityIcons name="delete-outline" size={ICON_SIZE} color={theme.colors.primary} />,
      onPress: () => {
        onDeleteBookmark();
        setShouldOpenOptions(false);
      }
    }
  ];

  return (
    <View>
      <View style={styles.sort}>
        <PressableItem
          style={styles.row}
          onPress={() => {
            goToLocation(location?.start?.cfi);
            navigation.goBack();
          }}
        >
          <View>
            <BodyText style={styles.bookmark}>{label}</BodyText>
            <BodyTextSmall variant="secondary">{createdAt}</BodyTextSmall>
          </View>
          <ThreeDots vertical onPress={() => setShouldOpenOptions(true)} />
        </PressableItem>
      </View>
      {shouldOpenOptions && (
        <Dialog
          onClose={() => setShouldOpenOptions(false)}
          modalHeight="20%"
          isVisible={shouldOpenOptions}
          isOverlay
          useCancelButton
        >
          {options.map((option, index) => (
            <PreferenceList
              key={index}
              title={option.title}
              onPress={option.onPress}
              hasLeftIcon
              isPressable
              leftIcon={option.icon}
              variant={option.variant}
              hasUnderline={index !== options.length - 1}
            />
          ))}
        </Dialog>
      )}
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    sort: {
      borderBottomColor: theme.colors.secondaryText,
      borderBottomWidth: 0.2,
      paddingVertical: 16,
      position: 'relative'
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    bookmark: {
      marginBottom: 5
    }
  });
