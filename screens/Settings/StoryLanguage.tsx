import { StyleSheet, View } from 'react-native';
import { BodyText, LinkText } from '../../components';
import { SettingContainer } from './SettingContainer';
import { Theme, useTheme, utilities } from '../../styles';
import { languages } from './settingsItems';

export const StoryLanguage = () => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const ios = <LinkText variant="primary">IOS Language settings</LinkText>;

  return (
    <SettingContainer title="Story Language">
      <View style={utilities.gap_2}>
        <View style={utilities.gap_1}>
          <BodyText>
            Set your preferred language to personalize the stories in Home, Search , and Recommendations
          </BodyText>
          <BodyText>Note: This wont change the app’s language. to do that please update your {ios}</BodyText>
        </View>
        <View style={styles.langContainer}>
          {languages.map((language, index) => (
            <BodyText key={index} style={styles.lang}>
              {language}
            </BodyText>
          ))}
        </View>
      </View>
    </SettingContainer>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    langContainer: {
      backgroundColor: theme.colors.background,
      paddingVertical: 10,
      borderRadius: 10
    },
    lang: {
      padding: 12
    }
  });
