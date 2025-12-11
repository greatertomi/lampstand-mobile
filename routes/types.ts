import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Note, READING_PRESET } from '../package/types';
import { ManifestItem } from '../types';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ResetPassword: undefined;
  AuthSuccess: undefined;
  SetPassword: undefined;
  ReadingHome: undefined;
  BookList: undefined;
  BookDetails: { bookPath: string };
  ReadingGoals: undefined;
  Achievement: undefined;
  Streaks: undefined;
  Settings: undefined;
  BookContentList: { bookPath: string };
  Reader: { item?: ManifestItem; bookPath: string; bookId: string; bookTitle?: string };
  AccountSettings: undefined;
  NotificationSettings: undefined;
  ProfileSettings: undefined;
  ChangePassword: undefined;
  FAQ: undefined;
  DeleteAccount: undefined;
  AboutLampstand: undefined;
  Appearance: undefined;
  EditReadingGoal: undefined;
  NumberVerification: undefined;
  SMSVerification: undefined;
  BottomTab: undefined;
  MyBooks: undefined;
  Bookmarks: { bookId: string };
  TableOfContent: undefined;
  OTPVerification: undefined;
  OTPSuccess: undefined;
  Analytics: undefined;
  Highlights: { bookId: string };
  SearchBook: undefined;
  InTextComment: { noteItem: Note; bookId: string };
  SendComplaint: undefined;
  SendFeedback: undefined;
  SupportSuccess: {
    message: string;
    description: string;
  };
  Legal: undefined;
  CustomizePresetScreen: { selectedPreset: READING_PRESET };
};

export type ScreenNavigation<T extends keyof RootStackParamList> = NativeStackNavigationProp<RootStackParamList, T>;
export type RouteNavigation<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>;
