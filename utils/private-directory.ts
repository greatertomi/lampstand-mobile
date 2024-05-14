import * as FileSystem from 'expo-file-system';

const DIRECTORY_NAME = 'lampstand_sandbox';

export const getPrivateDirectory = async (): Promise<string> => {
  const directory = `${FileSystem.documentDirectory}${DIRECTORY_NAME}`;
  const dirInfo = await FileSystem.getInfoAsync(directory);
  if (!dirInfo.exists) {
    console.log(`Directory ${DIRECTORY_NAME} doesn't exist, creating...`);
    await FileSystem.makeDirectoryAsync(directory);
  }
  return directory;
};
