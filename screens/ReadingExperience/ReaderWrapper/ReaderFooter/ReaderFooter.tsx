import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { menu } from '../../../../assets';
import { BodyTextSmall } from '../../../../components';
import { Theme, useTheme } from '../../../../styles';
import { ReaderMenu } from '../ReaderMenu';

type ReaderFooterProps = {
  pageNumber?: string;
  totalPageNumber?: string;
};

export const ReaderFooter = ({ pageNumber, totalPageNumber }: ReaderFooterProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return (
    <View style={styles.footer}>
      <View style={[styles.absoluteItem, styles.pageNum]}>
        <BodyTextSmall style={styles.pageDetails}>
          {pageNumber} / {totalPageNumber}
        </BodyTextSmall>
      </View>
      {isMenuOpen ? (
        <ReaderMenu onClose={() => setIsMenuOpen(false)} />
      ) : (
        <Pressable style={[styles.absoluteItem, styles.menu]} onPress={() => setIsMenuOpen(true)}>
          <SvgXml xml={menu(theme.colors.text)} />
        </Pressable>
      )}
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    footer: {
      position: 'relative'
    },
    absoluteItem: {
      position: 'absolute',
      bottom: 24,
      borderRadius: 8,
      padding: 8
    },
    pageNum: {
      alignSelf: 'center',
      backgroundColor: theme.colors.readerIconBackground,
      color: theme.colors.text
    },
    menu: {
      right: 24,
      backgroundColor: theme.colors.readerIconBackground
    },
    pageDetails: {
      color: theme.colors.text
    }
  });
