import * as FileSystem from 'expo-file-system';

const DIRECTORY_NAME = 'lampstand';

export const getPrivateDirectory = async (): Promise<string> => {
  const directory = `${FileSystem.documentDirectory}${DIRECTORY_NAME}/`;
  const dirInfo = await FileSystem.getInfoAsync(directory);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(directory);
  }
  return directory;
};
