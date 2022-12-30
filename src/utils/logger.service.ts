import { Injectable, Logger } from '@nestjs/common';
import * as chalk from 'chalk';

@Injectable()
export class LoggerService {
  private readonly logger = new Logger(LoggerService.name);

  error(message: string, context?: object): void {
    this.log('error', message, context, chalk.red);
  }

  warn(message: string, context?: object): void {
    this.log('warn', message, context, chalk.yellow);
  }

  info(message: string, context?: object): void {
    this.log('info', message, context, chalk.green);
  }

  debug(message: string, context?: object): void {
    this.log('debug', message, context, chalk.blue);
  }

  private log(
    level: string,
    message: string,
    context?: object,
    color?: (s: string) => string,
  ): void {
    const log = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
    };
    if (color) {
      this.logger.log(color(JSON.stringify(log)));
    } else {
      this.logger.log(JSON.stringify(log));
    }
  }
}
