import * as Sentry from '@sentry/react-native';
import { logger as reactNativeLogger, consoleTransport, sentryTransport } from 'react-native-logs';

export const SentryLogger = {
  captureException: (msg: string) => {
    Sentry.captureException(new Error(msg));
  },
  addBreadcrumb: (_msg: string) => {
    Sentry.addBreadcrumb({ message: _msg, level: 'info' });
  }
};

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
  transport: [consoleTransport, sentryTransport],
  transportOptions: {
    colors,
    SENTRY: SentryLogger,
    errorLevels: ['error']
  },
  levels: logLevel,
  async: true,
  printLevel: true,
  printDate: true,
  fixedExtLvlLength: false,
  enabled: true
};

// @ts-expect-error: TypeScript is confused here
export const logger = reactNativeLogger.createLogger(config);
