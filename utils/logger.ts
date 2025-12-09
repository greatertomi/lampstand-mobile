import * as Sentry from '@sentry/react-native';
import { logger as reactNativeLogger, consoleTransport, sentryTransport } from 'react-native-logs';

export const SentryLogger = {
  captureException: (msg: unknown) => {
    const error = msg instanceof Error ? msg : new Error(String(msg));
    Sentry.captureException(error);
  },
  addBreadcrumb: (msg: string | { message: string }) => {
    const message = typeof msg === 'string' ? msg : msg.message;
    Sentry.addBreadcrumb({ message, level: 'info' });
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
  severity: __DEV__ ? 'debug' : 'error',
  transport: __DEV__ ? consoleTransport : [consoleTransport, sentryTransport],
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

export const logger = reactNativeLogger.createLogger(config);
