import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import {
  access,
  appendFile,
  stat,
  writeFile,
  constants,
  readdir,
} from 'fs/promises';
import { EOL } from 'os';
import { resolve } from 'path';
import { getLogLevel } from './getLogLevel';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLoggerService extends ConsoleLogger {
  private logLvls: string[];
  private logsdir: string;

  constructor(context?: string) {
    super(context || 'Server');
    this.logLvls = getLogLevel(process.env.LOG_LVL);
    this.logsdir = process.env.LOG_DIR;
  }

  async error(message: string) {
    if (this.logLvls.includes('error')) {
      await this.writeLog(message, `${this.context}`, 'error');
      super.error(message, this.context);
    }
  }
  async log(message: string) {
    if (this.logLvls.includes('log')) {
      await this.writeLog(message, this.context, 'log');
      super.log(message, this.context);
    }
  }
  async warn(message: string) {
    if (this.logLvls.includes('warn')) {
      await this.writeLog(message, `Warning on ${this.context}`, 'log');
      super.warn(message, this.context);
    }
  }
  async debug(message: string) {
    if (this.logLvls.includes('debug')) {
      await this.writeLog(message, this.context, 'log');
      super.debug(message, this.context);
    }
  }
  async verbose(message: string) {
    if (this.logLvls.includes('verbose')) {
      await this.writeLog(message, this.context, 'log');
      super.verbose(message, this.context);
    }
  }

  private async writeLog(message: string, context: string, filename: string) {
    const filepath = await this.getLogFile(filename);
    const date = new Date().toUTCString();
    const logMessage = `${date} -> [${context}] -> ${message} ${EOL}`;
    await appendFile(filepath, logMessage, 'utf-8');
  }

  private async getLogFile(filename: string) {
    if (filename === 'error') {
      const { size, index } = await this.checkLogFile('error');
      if (size >= +process.env.LOG_FILE_SIZE * 1024) {
        return resolve(this.logsdir, `${filename}-${index + 1}.txt`);
      }
      return resolve(this.logsdir, `${filename}-${index}.txt`);
    } else {
      const { size, index } = await this.checkLogFile('log');
      if (size >= +process.env.LOG_FILE_SIZE * 1024) {
        return resolve(this.logsdir, `${filename}-${index + 1}.txt`);
      }
      return resolve(this.logsdir, `${filename}-${index}.txt`);
    }
  }
  private async checkLogFile(logName: string) {
    let index = 0;
    const dirlen = (await readdir(this.logsdir)).filter((d) =>
      d.includes(logName),
    ).length;
    if (dirlen > 0) {
      index = dirlen - 1;
    }
    const filepath = resolve('logsDir', `${logName}-${index}.txt`);
    try {
      await access(filepath, constants.R_OK | constants.W_OK);
    } catch {
      await writeFile(filepath, `${EOL}`, 'utf-8');
    }
    const size = (await stat(filepath)).size;
    return { size, index };
  }
}
