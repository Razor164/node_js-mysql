module.exports = {
    "up": `CREATE TABLE business_master(
		id int NOT NULL AUTO_INCREMENT,
		business_name varchar(45),
		approval_status varchar(45),
		business_phone varchar(45),
		business_website varchar(45),
		created_at DATETIME,
		updated_at DATETIME,
		business_category_id int,
		user_id int,
		owner_id int,
		FOREIGN KEY (business_category_id) REFERENCES business_categories(id),
		FOREIGN KEY (user_id) REFERENCES users(id),
		PRIMARY KEY (id)
	)`,
    "down": "DROP TABLE business_master"
}