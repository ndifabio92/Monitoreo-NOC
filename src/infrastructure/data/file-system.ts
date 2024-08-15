import fs from 'fs';

import { LogData } from "../../domain/data/log";
import { Log, LogServerityLevel } from '../../domain/entities/log';

export class FileSystemData implements LogData {

    private readonly logPath = "logs/";
    private readonly allLogsPath = "logs/logs-all.log";
    private readonly mediumLogsPath = "logs/logs-medium.log";
    private readonly highLogsPath = "logs/logs-high.log";


    constructor() {
        this.createLogsFiles();
    }

    async saveLog(newLog: Log): Promise<void> {
        const logAsJson = `${JSON.stringify(newLog)} \n`;

        fs.appendFileSync(this.allLogsPath, logAsJson);

        if (newLog.level === LogServerityLevel.low) return;

        if (newLog.level === LogServerityLevel.medium) {
            fs.appendFileSync(this.mediumLogsPath, logAsJson);
        } else {
            fs.appendFileSync(this.highLogsPath, logAsJson);
        }

    }

    async getLogs(severityLevel: LogServerityLevel): Promise<Log[]> {
        switch (severityLevel) {
            case LogServerityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
            case LogServerityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);
            case LogServerityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);

            default:
                throw new Error(`${severityLevel} not implemented`)
        }
    }

    private createLogsFiles = () => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach(path => {
            if (fs.existsSync(path)) return;
            fs.writeFileSync(path, '');
        })
    }

    private getLogsFromFile = (path: string): Log[] => {
        const content = fs.readFileSync(path, 'utf-8');
        const logs = content.split('\n').map(Log.fromJson);

        return logs;
    }

}