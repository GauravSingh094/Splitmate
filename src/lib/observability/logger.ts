export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
  environment: string;
}

class Logger {
  private isDev = process.env.NODE_ENV !== 'production';

  private log(level: LogLevel, message: string, context?: Record<string, unknown>) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context: this.sanitize(context),
      environment: process.env.NODE_ENV || 'development',
    };

    if (this.isDev) {
      const styles = {
        debug: 'color: #94a3b8',
        info: 'color: #3b82f6',
        warn: 'color: #f59e0b',
        error: 'color: #ef4444; font-weight: bold',
      };
      // eslint-disable-next-line no-console
      console.log(
        `%c[Splito ${level.toUpperCase()}] ${message}`,
        styles[level],
        entry.context || '',
      );
    }
  }

  private sanitize(context?: Record<string, unknown>): Record<string, unknown> | undefined {
    if (!context) return undefined;
    const sanitized = { ...context };
    const sensitiveKeys = ['password', 'token', 'secret', 'authorization', 'creditCard'];

    Object.keys(sanitized).forEach((key) => {
      if (sensitiveKeys.some((s) => key.toLowerCase().includes(s))) {
        sanitized[key] = '[REDACTED]';
      }
    });

    return sanitized;
  }

  debug(message: string, context?: Record<string, unknown>) {
    this.log('debug', message, context);
  }

  info(message: string, context?: Record<string, unknown>) {
    this.log('info', message, context);
  }

  warn(message: string, context?: Record<string, unknown>) {
    this.log('warn', message, context);
  }

  error(message: string, context?: Record<string, unknown>) {
    this.log('error', message, context);
  }
}

export const logger = new Logger();
