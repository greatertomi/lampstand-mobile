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
 * Checks if a path is absolute.
 * In this context, an absolute path starts with 'file://' or '/'.
 * @param path - The path to check.
 * @returns True if the path appears to be absolute.
 */
export const isAbsolutePath = (path: string): boolean => path.startsWith('file://') || path.startsWith('/');

/**
 * Gets the absolute path for a book file, handling both relative and absolute paths.
 * @param path - Either absolute or relative path.
 * @returns The absolute path.
 */
export const resolveBookPath = async (path: string): Promise<string> => {
  if (isAbsolutePath(path)) {
    return path;
  }
  return convertRelativeToAbsolute(path);
};
