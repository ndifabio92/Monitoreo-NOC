import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemData } from '../infrastructure/data/file-system';
import { LogImpl } from '../infrastructure/repositories/log';
import { CronService } from './cron/cron-service';

const fileSystemLogRepository = new LogImpl(
    new FileSystemData()
)


export class Server {
    public static start() {
        console.log('Server started...');
        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://google.com';
                new CheckService(
                    fileSystemLogRepository,
                    () => console.log(`${url} is ok`),
                    (error) => console.log(error),
                ).execute(url);
                // new CheckService().execute( 'http://localhost:3000' );
            }
        );
    }
}