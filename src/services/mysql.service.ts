import { APILogger } from './logger.service';
import { API_CONFIG } from './convict.service';
import { Tables } from '../models/enums/tables';
import { Table } from '../models/classes/table';
import { IUser } from '../models/interfaces/user';
import { IReview } from '../models/interfaces/review';
import { IRole } from '../models/interfaces/roles';
import { ICategory } from '../models/interfaces/category';
var mysql = require('mysql');

class MysqlConnector {

	private logger = APILogger.getLogger('mysql-connector');
	private mysqlConfig = {
		host: API_CONFIG.mysql.url,
		user: API_CONFIG.mysql.user,
		database: API_CONFIG.mysql.dbName,
		password: API_CONFIG.mysql.password,
	};
	public tables = {
		users: new Table<IUser>(Tables.Users),
		roles: new Table<IRole>(Tables.Roles),
		reviews: new Table<IReview>(Tables.Reviews),
		businessCategories: new Table<ICategory>(Tables.BusinessCategories),
	};
	public connection;

	constructor() {
		this.connect();
	}

	terminate(): void {
		this.connection.end(err => {
			if (err) throw err;
			this.logger.info('Connection closed');
		});
	}

	private connect(): void {
		this.logger.info('Connecting to database...');
		this.connection = mysql.createConnection(this.mysqlConfig);
		this.connection.connect(error => {
			if (error) throw error;
			this.logger.info('Connected to database!');
		});

		this.createDatabase();
	}

	private createDatabase(): void {
		this.connection.query(`CREATE DATABASE IF NOT EXISTS ${API_CONFIG.mysql.dbName}`, (err, res) => {
			if (err) throw err;
			
			if (!res.warningCount)
				this.logger.info(`Database created`);
		});
	}
}

export const MYSQL = new MysqlConnector();