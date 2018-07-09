import { IAdminCredentials } from './credentials';

export interface IConfig {
    port: number;
    baseUrl: string;
    mysql: IMysqlConfig;
    mailer: IMailerConfig;
    admin: IAdminCredentials;
}

export interface IMysqlConfig {
    url: string;
	dbName: string;
    user: string;
    password: string;
}

export interface IMailerConfig {
    user: string;
    password: string;
    host: string;
    port: number;
}