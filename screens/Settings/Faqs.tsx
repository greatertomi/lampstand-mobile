import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { BodyText } from '../../components';
import { Theme, useTheme } from '../../styles';

import { SettingContainer } from './SettingContainer';

const answer = 'Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list.';

const questions = [
  {
    questionId: 1,
    question: 'Where can I upload my books ?',
    answer
  },
  {
    questionId: 2,
    question: 'How many books can I read ?',
    answer
  },
  {
    questionId: 3,
    question: 'How can I write a book ?',
    answer
  },
  {
    questionId: 4,
    question: 'How can I a book offline ?',
    answer
  },
  {
    questionId: 5,
    question: 'Others',
    answer
  }
];

export const Faqs = () => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const [clickedQuestion, setClickedQuestion] = useState<number | null>(null);

  const handlePress = (id: number | null) => {
    setClickedQuestion((prevId) => (prevId === id ? null : id));
  };

  return (
    <SettingContainer title="FAQ and Support">
      <View style={styles.container}>
        {questions.map((question, index) => (
          <Pressable onPress={() => handlePress(question.questionId)} key={index}>
            <View style={styles.accordion}>
              <View style={styles.heading}>
                <BodyText bold>{question.question}</BodyText>
                <MaterialIcons
                  name={clickedQuestion === question.questionId ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                  size={24}
                  color={theme.colors.text}
                />
              </View>
              {clickedQuestion === question.questionId && <BodyText>{answer}</BodyText>}
            </View>
          </Pressable>
        ))}
      </View>
    </SettingContainer>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderRadius: 10,
      paddingHorizontal: 16,
      paddingVertical: 24,
      gap: 16,
      backgroundColor: theme.colors.cardBackground
    },
    accordion: {
      gap: 10
    },
    heading: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  });
