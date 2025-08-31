import * as FileSystem from 'expo-file-system';

import { getPrivateDirectory } from '../private-directory';

jest.mock('expo-file-system');

describe('getPrivateDirectory', () => {
  const mockDirectory = `${FileSystem.documentDirectory}lampstand_sandbox/`;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('return the directory, if it already exists', async () => {
    (FileSystem.getInfoAsync as jest.Mock).mockResolvedValueOnce({ exists: true });
    const result = await getPrivateDirectory();

    expect(result).toBe(mockDirectory);
    expect(FileSystem.getInfoAsync).toHaveBeenCalledWith(mockDirectory);
    expect(FileSystem.makeDirectoryAsync).not.toHaveBeenCalled();
  });

  it('creates the directory if it does not exist', async () => {
    (FileSystem.getInfoAsync as jest.Mock).mockResolvedValueOnce({ exists: false });
    const result = await getPrivateDirectory();

    expect(result).toBe(mockDirectory);
    expect(FileSystem.getInfoAsync).toHaveBeenCalledWith(mockDirectory);
    expect(FileSystem.makeDirectoryAsync).toHaveBeenCalledWith(mockDirectory, { intermediates: true });
  });
});
