import { logger as reactNativeLogger, consoleTransport } from 'react-native-logs';

const logLevel = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
} as const;

const colors: Record<keyof typeof logLevel, 'blue' | 'green' | 'yellow' | 'red'> = {
  debug: 'blue',
  info: 'green',
  warn: 'yellow',
  error: 'red'
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
