module.exports = {
    "up": `CREATE TABLE roles(
		id int NOT NULL AUTO_INCREMENT,
		role varchar(45),
		created_at DATETIME,
		updated_at DATETIME,
		PRIMARY KEY (id))`,
    "down": "DROP TABLE roles"
}