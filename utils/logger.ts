import { logger as reactNativeLogger, consoleTransport } from 'react-native-logs';

const logLevel = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
};

const colors = {
  debug: 'blue' as const,
  info: 'green' as const,
  warn: 'yellow' as const,
  error: 'red' as const
};

const config = {
  severity: 'debug',
  transport: consoleTransport,
  transportOptions: { colors },
  levels: logLevel,
  async: true,
  printLevel: true,
  printDate: true,
  fixedExtLvlLength: false,
  enabled: true
};

export const logger = reactNativeLogger.createLogger(config);
