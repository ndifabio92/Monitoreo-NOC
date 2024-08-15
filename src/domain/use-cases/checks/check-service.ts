import { Log, LogServerityLevel } from '../../entities/log';
import { LogRepository } from '../../repository/logRepository';
interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;


export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) { }

    public async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`);
            }

            this.logRepository.saveLog(new Log(`Service ${url} working`, LogServerityLevel.low));
            this.successCallback && this.successCallback();
            return true;

        } catch (error) {
            this.logRepository.saveLog(new Log(`${url} is not ok ${error}`, LogServerityLevel.high));
            this.errorCallback && this.errorCallback(`${error}`);
            return false;
        }

    }

}
