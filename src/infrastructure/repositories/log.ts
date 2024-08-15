import { Log, LogServerityLevel } from "../../domain/entities/log";
import { LogRepository } from "../../domain/repository/logRepository";
import { LogData } from '../../domain/data/log';

export class LogImpl implements LogRepository {

    constructor(
        private readonly logData: LogData
    ) { }

    async saveLog(log: Log): Promise<void> {
        return this.logData.saveLog(log);
    }

    async getLogs(severityLevel: LogServerityLevel): Promise<Log[]> {
        return this.logData.getLogs(severityLevel);
    }

}