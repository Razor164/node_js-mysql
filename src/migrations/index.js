var mysql = require('mysql');
var migration = require('mysql-migrations');
var fs = require('file-system');
var path = require('path');

const config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'config/config.json')));
var args = process.argv.slice(2);
var connection = createConnection();

createDb();

function createDb() {
	connection.query(`CREATE DATABASE IF NOT EXISTS ${config.mysql.dbName}`, (err, res) => {
		if (err) throw err;
		if (!res.warningCount)
			console.log('Database created');

		connection.end();
		connection = createConnection(config.mysql.dbName);
		console.log('Migrations has started');
		migration.init(connection, __dirname + '/schemas');
		console.log('Migrations has completed');
	});
}

function createConnection(dbName) {
	return mysql.createPool({
		connectionLimit: 10,
		host: config.mysql.url,
		user: config.mysql.user,
		password: config.mysql.password,
		database: dbName
	});
}