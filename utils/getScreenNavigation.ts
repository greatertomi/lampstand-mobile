import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes';

export type getScreenNavigation<T extends keyof RootStackParamList> = NativeStackNavigationProp<RootStackParamList, T>;
