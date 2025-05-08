import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { BodyText, PrimaryButton, OutlinedButton, Dialog } from '../../components';
import { utilities } from '../../styles';

export const LoggedInModal = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <Dialog isVisible={isVisible} isOverlay onClose={() => setIsVisible(isVisible)}>
      <>
        <Image style={styles.image} source={require('../../assets/images/readingTime.png')} />
        <View style={[utilities.align_self_center, utilities.mt_n4]}>
          <Text style={styles.timeToRead}>Time to read!!</Text>
          <BodyText>Set your Goal to track your reading.</BodyText>
        </View>
        <View style={utilities.gap_1}>
          <PrimaryButton title="Set Goal" />
          <OutlinedButton title="No Later" />
        </View>
      </>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  timeToRead: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold'
  },
  image: {
    width: 224,
    height: 224,
    alignSelf: 'center'
  }
});
