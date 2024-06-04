import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons, EvilIcons, Entypo } from '@expo/vector-icons';
import { BodyText, BodyTextSmall } from '../../components';
import { Theme, useTheme } from '../../styles';

type PasswordRulesProps = {
  password: string;
};

const rules = [
  {
    label: '8  Characters',
    test: (password: string) => password?.length >= 8
  },
  {
    label: '1  Number',
    test: (password: string) => /\d/.test(password)
  },
  {
    label: '1  Special Character',
    test: (password: string) => /[!#$%&*@^_]/.test(password)
  },
  {
    label: '1  Upper case',
    test: (password: string) => /[A-Z]/.test(password)
  }
];

export const PasswordRules = ({ password }: PasswordRulesProps) => {
  const [userIsTyping, setUserIsTyping] = useState(false);
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStylesheet(theme);

  useEffect(() => {
    if (password?.length > 0) {
      setUserIsTyping(true);
    }
  }, [password]);

  return (
    <View>
      <BodyText style={utils.mb_1}>Set up a strong password with at least</BodyText>
      {rules.map((rule, index) => (
        <View key={index} style={[utils.flex_dir_row, utils.align_items_center, utils.mt_1]}>
          {userIsTyping ? (
            rule.test(password) ? (
              <Ionicons name="checkmark" style={utils.mr_1} size={16} color={theme.colors.success} />
            ) : (
              <EvilIcons name="close" style={utils.mr_1} size={16} color={theme.colors.error} />
            )
          ) : (
            <Entypo name="dot-single" size={16} color={theme.colors.text} />
          )}
          <BodyTextSmall style={[styles.textColor, userIsTyping && !rule.test(password) && styles.errorText]}>
            {rule.label}
          </BodyTextSmall>
        </View>
      ))}
    </View>
  );
};

const createStylesheet = (theme: Theme) =>
  StyleSheet.create({
    textColor: {
      color: theme.colors.passwordRule
    },
    errorText: {
      color: theme.colors.error
    }
  });
