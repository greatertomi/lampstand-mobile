import { Entypo } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Constants from 'expo-constants';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { BodyText, HeadingSmall, PressableItem, TextAreaField } from '../../../components';
import { RouteNavigation } from '../../../routes';
import { addNote } from '../../../store';
import { Theme, useTheme } from '../../../styles';

export const InTextComment = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStylesheet(theme);
  const route = useRoute<RouteNavigation<'InTextComment'>>();
  const { noteItem, bookId } = route.params;
  const [comment, setComment] = useState<string>('');

  const handleAddNote = async () => {
    const values = { ...noteItem, comment };
    await addNote(bookId, values);
    navigation.goBack();
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <PressableItem onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={24} color={theme.colors.text} />
        </PressableItem>

        <HeadingSmall bold>Notes</HeadingSmall>

        {comment.trim() === '' ? (
          <View style={{ width: 33 }} />
        ) : (
          <PressableItem onPress={handleAddNote} style={[utils.flex_dir_row, utils.align_self_center, styles.saveBtn]}>
            <BodyText bold>Save</BodyText>
          </PressableItem>
        )}
      </View>

      <View style={styles.noteWrapper}>
        <View style={styles.note}>
          <BodyText style={styles.selectedText}>{noteItem.text}</BodyText>
        </View>
      </View>

      <View style={utils.px_2}>
        <TextAreaField
          placeholder="Add a note..."
          onChangeText={(text) => setComment(text)}
          textAlignTop
          cursorColor={theme.colors.primary}
        />
      </View>
    </View>
  );
};

const createStylesheet = (theme: Theme) =>
  StyleSheet.create({
    wrapper: {
      paddingTop: Constants.statusBarHeight * 1.5,
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingBottom: 16
    },
    header: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 16
    },
    saveBtn: {
      flexDirection: 'row',
      alignSelf: 'center'
    },
    selectedText: {
      textAlign: 'justify',
      lineHeight: 20
    },
    noteWrapper: {
      backgroundColor: theme.colors.cardBackground,
      paddingHorizontal: 16,
      marginLeft: 8,
      marginTop: 32
    },
    note: {
      backgroundColor: theme.colors.cardBackground,
      borderLeftWidth: 2,
      borderLeftColor: theme.colors.primary,
      paddingHorizontal: 16
    },
    disabledBtn: {
      display: 'none'
    }
  });
