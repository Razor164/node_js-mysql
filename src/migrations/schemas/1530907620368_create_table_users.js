module.exports = {
    "up": `CREATE TABLE users (
		id int NOT NULL AUTO_INCREMENT,
		first_name varchar(45),
		last_name varchar(45),
		email varchar(45),
		password varchar(45),
		role_id int,
		PRIMARY KEY (id),
		FOREIGN KEY (role_id) REFERENCES roles(id))`,
    "down": "DROP TABLE users"
}