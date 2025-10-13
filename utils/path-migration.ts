import * as FileSystem from 'expo-file-system';

import { logger } from './logger';
import { getPrivateDirectory } from './private-directory';

/**
 * Converts an absolute path to a relative path within the private directory
 * @param absolutePath - The absolute path to convert
 * @returns The relative path or null if conversion fails
 */
export const convertAbsoluteToRelative = async (absolutePath: string): Promise<string | null> => {
  try {
    const privateDirectory = await getPrivateDirectory();

    if (!absolutePath || !absolutePath.includes(privateDirectory)) {
      logger.warn(`Path ${absolutePath} is not within the private directory`);
      return null;
    }

    return absolutePath.slice(privateDirectory.length);
  } catch (error) {
    logger.error('Failed to convert absolute path to relative:', error);
    return null;
  }
};

/**
 * Converts a relative path to an absolute path within the current private directory
 * @param relativePath - The relative path to convert
 * @returns The absolute path
 */
export const convertRelativeToAbsolute = async (relativePath: string): Promise<string> => {
  try {
    const privateDirectory = await getPrivateDirectory();
    return `${privateDirectory}${relativePath}`;
  } catch (error) {
    logger.error('Failed to convert relative path to absolute:', error);
    throw error;
  }
};

/**
 * Checks if a path is relative (doesn't start with file:// or contain document directory)
 * @param path - The path to check
 * @returns True if the path appears to be relative
 */
export const isRelativePath = (path: string): boolean =>
  !path.startsWith('file://') && !path.includes('DocumentDir') && !path.includes('Documents');

/**
 * Migrates a file from an old absolute path to the current private directory structure
 * @param oldAbsolutePath - The old absolute path
 * @param relativePath - The relative path within the private directory
 * @returns The new absolute path or null if migration fails
 */
export const migrateBookFile = async (oldAbsolutePath: string, relativePath: string): Promise<string | null> => {
  try {
    const newAbsolutePath = await convertRelativeToAbsolute(relativePath);

    // Check if the old file exists
    const oldFileInfo = await FileSystem.getInfoAsync(oldAbsolutePath);
    if (!oldFileInfo.exists) {
      logger.warn(`Old file does not exist: ${oldAbsolutePath}`);
      return null;
    }

    // Check if the new file already exists
    const newFileInfo = await FileSystem.getInfoAsync(newAbsolutePath);
    if (newFileInfo.exists) {
      logger.info(`File already exists at new location: ${newAbsolutePath}`);
      return newAbsolutePath;
    }

    // Ensure the target directory exists
    const targetDir = newAbsolutePath.slice(0, Math.max(0, newAbsolutePath.lastIndexOf('/')));
    await FileSystem.makeDirectoryAsync(targetDir, { intermediates: true });

    // Copy the file to the new location
    await FileSystem.copyAsync({
      from: oldAbsolutePath,
      to: newAbsolutePath
    });

    logger.info(`Successfully migrated book file from ${oldAbsolutePath} to ${newAbsolutePath}`);
    return newAbsolutePath;
  } catch (error) {
    logger.error(`Failed to migrate book file from ${oldAbsolutePath}:`, error);
    return null;
  }
};

/**
 * Validates that a book file exists at the given path
 * @param path - Either absolute or relative path
 * @returns True if the file exists
 */
export const validateBookFile = async (path: string): Promise<boolean> => {
  try {
    const absolutePath = isRelativePath(path) ? await convertRelativeToAbsolute(path) : path;
    const fileInfo = await FileSystem.getInfoAsync(absolutePath);
    return fileInfo.exists;
  } catch (error) {
    logger.error(`Failed to validate book file at ${path}:`, error);
    return false;
  }
};

/**
 * Gets the absolute path for a book file, handling both relative and absolute paths
 * @param path - Either absolute or relative path
 * @returns The absolute path
 */
export const resolveBookPath = async (path: string): Promise<string> => {
  if (isRelativePath(path)) {
    return convertRelativeToAbsolute(path);
  }
  return path;
};
