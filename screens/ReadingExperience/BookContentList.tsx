import React from 'react';
import { StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { RouteProp as RNRouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes';
import { findClosestPath } from '../../utils';
import { useBookRenderer } from '../../hooks';
import { ManifestItem } from '../../types';

type RouteProp = RNRouteProp<RootStackParamList, 'BookContentList'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'BookContentList'>;

const getActualPath = (currentPath: string, bookPathList: string[]): string => {
  if (bookPathList.includes(currentPath)) {
    return currentPath;
  }

  const closestPossiblePath = findClosestPath(currentPath, bookPathList);
  return closestPossiblePath || currentPath;
};

export const BookContentList = () => {
  const route = useRoute<RouteProp>();
  const navigation = useNavigation<NavigationProp>();

  const { bookPath } = route.params;
  const { filePaths, manifest } = useBookRenderer(bookPath);

  const renderItem = ({ item, index }: { item: ManifestItem; index: number }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Reader', { item: { ...item, href: getActualPath(item.href, filePaths) }, bookPath })
      }
      key={index}
    >
      <Text style={styles.item}>{item.href}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>{manifest?.map((item, index) => renderItem({ item, index }))}</ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
});
