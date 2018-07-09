module.exports = {
    "up": `CREATE TABLE business_categories(
		id int NOT NULL AUTO_INCREMENT,
		business_type varchar(45),
		created_at DATETIME,
		updated_at DATETIME,
		PRIMARY KEY (id)
	)`,
    "down": "DROP TABLE business_categories"
}