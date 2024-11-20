import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { filter } from '../../assets/svg';
import { Theme, useTheme } from '../../styles';
import { IconButton } from '../Button';

export type SearchProps = {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
} & TextInputProps;

export const Search = ({ searchTerm, onSearchTermChange, ...rest }: SearchProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const utils = theme.utilities;

  return (
    <View style={styles.container}>
      <View style={utils.pr_1}>
        <AntDesign name="search1" size={20} color={theme.colors.text} />
      </View>
      <TextInput
        placeholder="Search"
        style={[styles.textInput, { backgroundColor: theme.colors.background }]}
        numberOfLines={1}
        inputMode="text"
        value={searchTerm}
        onChangeText={onSearchTermChange}
        {...rest}
      />
      <IconButton>
        <SvgXml xml={filter} />
      </IconButton>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: theme.colors.lightGray,
      backgroundColor: theme.colors.background,
      borderRadius: 50,
      paddingHorizontal: 20,
      paddingVertical: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    textInput: {
      flex: 1,
      fontSize: theme.fontSizes.caption
    }
  });
