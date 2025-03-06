import { useRef, useState } from 'react';
import { NativeSyntheticEvent, TextInput, TextInputKeyPressEventData, View, StyleSheet } from 'react-native';

import { OTPInput } from './OTPInput';

interface OTPInputGroupProps {
  length?: number;
  value: string[];
  onChange: (otp: string[]) => void;
  onSubmit: () => void;
}

export const OTPInputGroup = ({ length = 4, value, onChange, onSubmit }: OTPInputGroupProps) => {
  const inputs = useRef<Array<TextInput | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOTPChange = (digit: string, index: number) => {
    const newOTP = [...value];
    newOTP[index] = digit;
    onChange(newOTP);

    if (digit) {
      if (index < length - 1) {
        inputs.current[index + 1]?.focus();
        setActiveIndex(index + 1);
      } else {
        onSubmit(); // Submit OTP when last digit is entered
      }
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && !value[index]) {
      inputs.current[index - 1]?.focus();
      setActiveIndex(index - 1);
    }
  };

  return (
    <View style={styles.otpContainer}>
      {value.map((digit, index) => (
        <OTPInput
          key={index}
          isActive={index === activeIndex}
          value={digit}
          onChangeText={(text) => handleOTPChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          ref={(input) => {
            inputs.current[index] = input;
          }}
          autoFocus={index === 0}
          returnKeyType="next"
          onBlur={() => {}}
          onSubmitEditing={() => {
            if (index < length - 1) {
              inputs.current[index + 1]?.focus();
            }
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 30
  }
});
