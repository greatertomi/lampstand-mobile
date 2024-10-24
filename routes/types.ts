import { NativeStackNavigationProp } from '@react-navigation/native-stack';
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
  LoggedInModal: undefined;
  Settings: undefined;
  BookContentList: { bookPath: string };
  Reader: { item?: ManifestItem; bookPath: string };
  AccountSettings: undefined;
  NotificationSettings: undefined;
  ProfileSettings: undefined;
  ChangePassword: undefined;
  FAQ: undefined;
  Faqs: undefined;
  DeleteAccount: undefined;
  AboutLampstand: undefined;
  Appearance: undefined;
  EditReadingGoal: undefined;
  NumberVerification: undefined;
  SMSVerification: undefined;
  BottomTab: undefined;
  MyBooks: { alertMessage?: { message?: string; variant?: 'success' | 'error' } };
};

export type ScreenNavigation<T extends keyof RootStackParamList> = NativeStackNavigationProp<RootStackParamList, T>;
