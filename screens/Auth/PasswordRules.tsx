import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
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
      <BodyText>Set up a strong password with at least</BodyText>
      {rules.map((rule, index) => (
        <View key={index} style={[utils.flex_dir_row, utils.align_items_center]}>
          {userIsTyping ? (
            rule.test(password) ? (
              <FontAwesome5 name="check" style={utils.mr_1} size={14} color={theme.colors.success} />
            ) : (
              <FontAwesome5 name="times" style={utils.mr_1} size={14} color={theme.colors.error} />
            )
          ) : (
            <Entypo name="dot-single" size={14} color={theme.colors.text} />
          )}
          <BodyTextSmall style={styles.textColor}>{rule.label}</BodyTextSmall>
        </View>
      ))}
    </View>
  );
};

const createStylesheet = (theme: Theme) =>
  StyleSheet.create({
    textColor: {
      color: theme.colors.passwordRule
    }
  });
