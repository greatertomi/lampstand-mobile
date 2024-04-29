import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Pressable, PressableProps, StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { Theme, useTheme } from '../../styles';

export type SearchProps = {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
} & PressableProps & TextInputProps;

export const Search = ({ searchTerm, onSearchTermChange, ...rest }: SearchProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const _s = theme.utilities;

  return (
    <View style={styles.container}>
      <View style={_s.pr_1}>
        <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <Path
            d="M11.8466 11.8583L15.75 15.75M13.5 7.875C13.5 10.9816 10.9816 13.5 7.875
            13.5C4.7684 13.5 2.25 10.9816 2.25 7.875C2.25 4.7684 4.7684 2.25 7.875
            2.25C10.9816 2.25 13.5 4.7684 13.5 7.875Z"
            stroke="#757575"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </View>
      <TextInput
        placeholder="Search"
        style={[styles.textInput, { backgroundColor: theme.colors.light }]}
        numberOfLines={1}
        inputMode="text"
        value={searchTerm}
        onChangeText={onSearchTermChange}
        {...rest}
      />
      <Pressable {...rest}>
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <Path d="M4 7H20" stroke="#757575" strokeLinecap="round" strokeLinejoin="round" />
          <Path d="M7 12H17" stroke="#757575" strokeLinecap="round" strokeLinejoin="round" />
          <Path d="M11 17H13" stroke="#757575" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      </Pressable>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: theme.colors.lightGray,
      backgroundColor: theme.colors.light,
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
