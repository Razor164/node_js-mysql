var mysql = require('mysql');
var fs = require('file-system');
var path = require('path');

const config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'config/config.json')));
var connection = createConnection();

dropDb();

function dropDb() {
	connection.query(`DROP DATABASE ${config.mysql.dbName}`);
	console.log('Database has dropped');
	connection.end();
}

function createConnection(dbName) {
	return mysql.createPool({
		connectionLimit: 10,
		host: config.mysql.url,
		user: config.mysql.user,
		database: dbName
	});
}