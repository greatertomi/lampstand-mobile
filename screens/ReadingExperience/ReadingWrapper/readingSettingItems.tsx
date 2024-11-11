import { AntDesign } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import { ReadingSettingTypes } from './types';
import { BodyText, BodyTextSmall, HeadingSmall } from '../../../components';
import { Theme } from '../../../styles';
import { flipDevice } from '../../../assets';

export const FontSettings = (theme: Theme): ReadingSettingTypes[] => [
  {
    setting: <BodyTextSmall>A</BodyTextSmall>,
    backgroundColor: theme.colors.secondaryBackground
  },
  {
    setting: <BodyText>A</BodyText>,
    backgroundColor: theme.colors.secondaryBackground
  },
  {
    setting: <AntDesign name="search1" size={24} color={theme.colors.text} />,
    backgroundColor: theme.colors.secondaryBackground
  },
  {
    setting: <SvgXml xml={flipDevice(theme.colors.text)} />,
    backgroundColor: theme.colors.secondaryBackground
  }
];

export const ReadingMode = (theme: Theme): ReadingSettingTypes[] => [
  {
    setting: <HeadingSmall>Aa</HeadingSmall>,
    title: <BodyTextSmall>Original</BodyTextSmall>,
    backgroundColor: theme.colors.secondaryBackground
  },
  {
    setting: <HeadingSmall bold>Aa</HeadingSmall>,
    title: <BodyTextSmall style={{ color: theme.colors.paper }}>Paper</BodyTextSmall>,
    backgroundColor: theme.colors.paper
  },
  {
    setting: <HeadingSmall bold>Aa</HeadingSmall>,
    title: <BodyTextSmall bold>Quiet</BodyTextSmall>,
    backgroundColor: theme.colors.secondaryBackground
  }
];
