import { Log, LogServerityLevel } from "../entities/log";

export abstract class LogRepository {
    abstract saveLog(log: Log): Promise<void>;
    abstract getLogs(severityLevel: LogServerityLevel): Promise<Log[]>;
}