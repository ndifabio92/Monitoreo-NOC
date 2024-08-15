export enum LogServerityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high'
}

export class Log {
  public level: LogServerityLevel;
  public message: string;
  public createdAt: Date;

  constructor(message: string, level: LogServerityLevel) {
    this.message = message;
    this.level = level;
    this.createdAt = new Date();
  }

  static fromJson = (json: string): Log => {
    const { message, level, createdAt } = JSON.parse(json);

    const log = new Log(message, level);
    log.createdAt = new Date(createdAt);

    return log;
  }
}


