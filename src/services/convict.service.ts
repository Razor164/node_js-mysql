import * as convict from 'convict';
import { IMysqlConfig, IMailerConfig } from '../models/interfaces/config';
import { IAdminCredentials } from '../models/interfaces/credentials';

class Config {
    private config;
    private default = {
        port: {
            doc: 'API port',
            format: Number,
            default: 3000,
        },
        baseUrl: {
            doc: 'Frontend url',
            format: String,
            default: 'http://localhost:8000',
        },
        admin: {
            login: {
                doc: 'Admin login',
                format: String,
                default: 'admin',
            },
            password: {
                doc: 'Admin password',
                format: String,
                default: '12345',
            },
		},
		mysql: {
			url: {
				doc: 'Db url',
				format: String,
				default: 'localhost', 
			},
			user: {
				doc: 'User password',
				format: String,
				default: 'root',
			},
			dbName: {
				doc: 'Database name',
				format: String,
				default: 'Phoenix',
            },
            password: {
				doc: 'Database password',
				format: String,
				default: 'admin',
			},
		},
        mailer: {
            user: {
                doc: 'Mailer user',
                format: String,
                default: 'AKIAINJSQ3SJQWZF2JJA',
            },
            password: {
                doc: 'Mailer password',
                format: String,
                default: 'ApJb2uga/a20h+nkWs6aoa9bzE1gffuW40aGDhJGz9pA',
            },
            host: {
                doc: 'Mailer host',
                format: String,
                default: 'email-smtp.us-east-1.amazonaws.com',
            },
            port: {
                doc: 'Mailer port',
                format: Number,
                default: 587,
            },
        },
    };

    constructor() {
        this.config = convict(this.default);
        this.config.loadFile(`${__dirname}/config.json`);
        this.config.validate({ allowed: 'strict' });
    }

    get port(): number {
        return this.config.get('port');
    }

    get baseUrl(): string {
        return this.config.get('baseUrl');
	}
	
	get mysql(): IMysqlConfig {
		return <IMysqlConfig>this.config.get('mysql');
	}

    get admin(): IAdminCredentials {
        return <IAdminCredentials>this.config.get('admin');
    }

    get mailer(): IMailerConfig {
        return <IMailerConfig>this.config.get('mailer');
    }
}

export const API_CONFIG = new Config();