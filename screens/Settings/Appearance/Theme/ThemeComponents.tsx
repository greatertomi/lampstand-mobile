import React from 'react';
import { StyleSheet, View } from 'react-native';

const DIV_RADIUS = 10;
// eslint-disable-next-line no-restricted-syntax
const slabBackgroundColor = '#898a8d';
// eslint-disable-next-line no-restricted-syntax
const primaryColor = '#ea4335';

export const FullGraySlab = () => <View style={styles.graySlab} />;

export const HalfGraySlab = () => <View style={styles.halfSlab} />;

export const FullPrimarySlab = () => <View style={{ ...styles.primarySlab, backgroundColor: primaryColor }} />;

export const RoundDots = () => <View style={styles.roundedDots} />;

export const TopLeft = (background: string) => (
  <View style={[styles.baseStyle, { backgroundColor: background, borderTopLeftRadius: DIV_RADIUS }]} />
);

export const TopRight = (background: string) => (
  <View style={[styles.baseStyle, { backgroundColor: background, borderTopRightRadius: DIV_RADIUS }]} />
);

export const BottomLeft = (background: string) => (
  <View style={[styles.baseStyle, { backgroundColor: background, borderBottomLeftRadius: DIV_RADIUS }]} />
);

export const BottomRight = (background: string) => (
  <View style={[styles.baseStyle, { backgroundColor: background, borderBottomRightRadius: DIV_RADIUS }]} />
);

const styles = StyleSheet.create({
  graySlab: {
    height: 8,
    width: 44,
    borderRadius: 2,
    backgroundColor: slabBackgroundColor
  },
  primarySlab: {
    height: 8,
    width: 44,
    borderRadius: 2
  },
  halfSlab: {
    height: 8,
    width: 19,
    borderRadius: 2,
    backgroundColor: slabBackgroundColor
  },
  roundedDots: {
    width: 6,
    height: 6,
    borderRadius: 50,
    backgroundColor: slabBackgroundColor
  },
  baseStyle: {
    width: 36,
    height: 64
  }
});
