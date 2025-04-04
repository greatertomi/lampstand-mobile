import { Entypo } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Constants from 'expo-constants';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { BodyText, HeadingSmall, PressableItem, TextAreaField } from '../../../components';
import { RouteNavigation } from '../../../routes';
import { addNote } from '../../../store';
import { Theme, useTheme } from '../../../styles';

export const IntextComment = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStylesheet(theme);
  const route = useRoute<RouteNavigation<'IntextComment'>>();
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
        <View style={[utils.width_25, utils.align_self_start]}>
          <PressableItem onPress={() => navigation.goBack()}>
            <Entypo name="chevron-left" size={24} color={theme.colors.text} />
          </PressableItem>
        </View>

        <HeadingSmall bold style={[utils.width_50, utils.text_center]}>
          Notes
        </HeadingSmall>

        <View style={styles.rightHeader}>
          <PressableItem onPress={handleAddNote} style={[styles.saveBtn, comment.trim() === '' && styles.disabledBtn]}>
            <BodyText>Save</BodyText>
          </PressableItem>
        </View>
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
          cursorColor={theme.colors.primary}
        />
      </View>
    </View>
  );
};

const createStylesheet = (theme: Theme) =>
  StyleSheet.create({
    wrapper: {
      paddingTop: Constants.statusBarHeight,
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingBottom: 16
    },
    header: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16
    },
    rightHeader: {
      width: '25%',
      alignItems: 'flex-end'
    },
    selectedText: {
      textAlign: 'justify',
      lineHeight: 20
    },
    noteWrapper: {
      backgroundColor: theme.colors.cardBackground,
      paddingHorizontal: 16,
      paddingVertical: 10,
      marginTop: 32
    },
    note: {
      backgroundColor: theme.colors.cardBackground,
      borderLeftWidth: 2,
      borderLeftColor: theme.colors.primary,
      paddingHorizontal: 16
    },
    saveBtn: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      backgroundColor: theme.colors.cardBackground,
      borderRadius: 20
    },
    disabledBtn: {
      display: 'none'
    }
  });
