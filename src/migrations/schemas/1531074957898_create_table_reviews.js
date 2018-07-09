module.exports = {
    "up": `CREATE TABLE reviews(
		id int NOT NULL AUTO_INCREMENT,
		date DATETIME,
		raiting int DEFAULT 1 check(raiting BETWEEN 1 and 5),
		text varchar(255),
		user_id int,
		FOREIGN KEY (user_id) REFERENCES users(id),
		PRIMARY KEY(id)
	)`,
    "down": "DROP TABLE reviews"
}