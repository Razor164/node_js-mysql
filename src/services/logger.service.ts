import * as winston from 'winston';

export class APILogger {
    static getLogger(name) {
        return new winston.Logger({
            transports: [
                new winston.transports.Console({
                    colorize: true,
                    level: PRODUCTION ? 'info' : 'debug',
                    label: name,
                }),
            ],
        });
    }
}