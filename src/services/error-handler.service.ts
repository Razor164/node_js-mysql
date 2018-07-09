import { APILogger } from './logger.service';

const logger = APILogger.getLogger('error-handler');

export class ErrorHandler {
    static handle(err, res): void {
        const msg = err.message;
        logger.error(msg);
        const status = err.status || 500;
        res.status(status).send({ err: msg });
    }
}