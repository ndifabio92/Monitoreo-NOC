import { Log, LogServerityLevel } from "../entities/log";

export abstract class LogData {
    abstract saveLog(log: Log): Promise<void>;
    abstract getLogs(severityLevel: LogServerityLevel): Promise<Log[]>;
}