import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';


import { access, appendFile, stat, writeFile, constants } from 'fs/promises';
import { EOL } from 'os';
import { resolve } from 'path';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLoggerService extends ConsoleLogger {
    //  private logsPath= path.join(__dirname, "logsDir")

    private errorIndex = 1
    private logIndex = 1

    async error(message: any, stack?: string, context?: string) {
        await this.writeLog(message, this.context, "errors", this.errorIndex)
        super.error(message);
    }
    async log(message: string) {
        await this.writeLog(message, this.context, "log", this.logIndex)
        super.log(message, this.context)
    }


    private async writeLog(message: string, context: string, filename: string, index: number) {
        const filepath = resolve("logsDir", `${filename}-${index}.txt`)
        try {
            await access(filepath, constants.R_OK | constants.W_OK);
        } catch {
            console.log("cannot access")
            await writeFile(filepath, `${EOL}`, "utf-8")
        }
        const size = (await stat(filepath)).size
        if (size >= +process.env.LOG_FILE_SIZE * 1024) {
            if (filename === "errors") this.errorIndex += 1;
            if (filename === "log") this.logIndex += 1;
        }

        const date = new Date().toUTCString()
        const logMessage = `${date} -> [${context}] -> ${message} ${EOL}`

        await appendFile(filepath, logMessage, 'utf-8')
    }


}
