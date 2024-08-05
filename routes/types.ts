import { ManifestItem } from '../screens/ReadingExperience/types';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ResetPassword: undefined;
  AuthSuccess: undefined;
  Library: undefined;
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
  Reader: { item: ManifestItem; bookPath: string };
};
