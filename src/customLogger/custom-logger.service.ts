import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { access, appendFile, stat, writeFile, constants } from 'fs/promises';
import { EOL } from 'os';
import { resolve } from 'path';
import { getLogLevel } from './getLogLevel';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLoggerService extends ConsoleLogger {
    private logLvls: string[]
    private errorIndex = 1;
    private logIndex = 1;

    constructor(context?: string) {
        super(context || "Initial");
        this.logLvls = getLogLevel(process.env.LOG_LVL)
        console.log('CustomLoggerService context:', this.logLvls);
    }


    async error(message: any) {
        if (this.logLvls.includes("error")) {
            await this.writeLog(message, `error on ${this.context}`, 'error', this.errorIndex);
            super.error(message, this.context);
        }
    }
    async log(message: string) {
        if (this.logLvls.includes("log")) {
            await this.writeLog(message, this.context, 'log', this.logIndex);
            super.log(message, this.context);
        }
    }
    async warn(message: string) {
        if (this.logLvls.includes("warn")) {
            await this.writeLog(message, `warning on ${this.context}`, 'log', this.logIndex);
            super.warn(message, this.context);
        }
    }
    async debug(message: string) {
        if (this.logLvls.includes("debug")) {
            await this.writeLog(message, this.context, 'log', this.logIndex);
            super.debug(message, this.context);
        }
    }
    async verbose(message: string) {
        if (this.logLvls.includes("verbose")) {
            await this.writeLog(message, this.context, 'log', this.logIndex);
            super.verbose(message, this.context);
        }
    }


    private async writeLog(
        message: string,
        context: string,
        filename: string,
        index: number,
    ) {
        const filepath = resolve('logsDir', `${filename}-${index}.txt`);
        try {
            await access(filepath, constants.R_OK | constants.W_OK);
        } catch {
            await writeFile(filepath, `${EOL}`, 'utf-8');
        }
        const size = (await stat(filepath)).size;
        if (size >= +process.env.LOG_FILE_SIZE * 1024) {
            if (filename === 'errors') this.errorIndex += 1;
            if (filename === 'log') this.logIndex += 1;
        }

        const date = new Date().toUTCString();
        const logMessage = `${date} -> [${context}] -> ${message} ${EOL}`;

        await appendFile(filepath, logMessage, 'utf-8');
    }
}
