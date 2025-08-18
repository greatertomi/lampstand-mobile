import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { View } from 'react-native';

import { PrimaryButton, BodyText, HeadingMedium } from '..';

import { BottomSheet } from './BottomSheet';

const meta: Meta<typeof BottomSheet> = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const BottomSheetDemo = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <PrimaryButton title="Open Bottom Sheet" onPress={() => setIsVisible(true)} />

      <BottomSheet
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        primaryButtonText="Confirm"
        primaryButtonOnPress={() => {
          setIsVisible(false);
          // Add your action here
        }}
        snapPoints={['40%']}
      >
        <HeadingMedium bold>Confirm Action</HeadingMedium>
        <BodyText style={{ textAlign: 'center', marginTop: 16 }}>
          Are you sure you want to proceed with this action?
        </BodyText>
      </BottomSheet>
    </View>
  );
};

export const Default: Story = {
  render: () => <BottomSheetDemo />
};

const CustomBottomSheetDemo = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <PrimaryButton title="Open Custom Bottom Sheet" onPress={() => setIsVisible(true)} />

      <BottomSheet
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        snapPoints={['60%']}
        footer={
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <PrimaryButton title="Cancel" onPress={() => setIsVisible(false)} style={{ flex: 1 }} />
            <PrimaryButton title="Confirm" onPress={() => setIsVisible(false)} style={{ flex: 1 }} />
          </View>
        }
      >
        <HeadingMedium bold>Custom Footer</HeadingMedium>
        <BodyText style={{ textAlign: 'center', marginTop: 16 }}>
          This bottom sheet demonstrates a custom footer with multiple buttons.
        </BodyText>
      </BottomSheet>
    </View>
  );
};

export const CustomFooter: Story = {
  render: () => <CustomBottomSheetDemo />
};
