import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '../../styles';
import { PressableItem } from '../Pressable';
import { HeadingSmall } from '../Typography';

interface BackButtonProps {
  title?: string;
}

export const BackButton = ({ title = 'Back' }: BackButtonProps) => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <PressableItem onPress={() => navigation.goBack()} style={styles.backButton}>
        <Entypo name="chevron-left" size={24} color={theme.colors.text} />
        <HeadingSmall>{title}</HeadingSmall>
      </PressableItem>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    width: '100%'
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
