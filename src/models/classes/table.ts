import { Tables } from "../enums/tables";
import { MYSQL } from "../../services/mysql.service";
import { API_ERROR } from "../constants/errors";

export class Table<T> {
	private tableName: Tables;

	constructor(tableName: Tables) {
		this.tableName = tableName;
	}

	async add(item: T): Promise<any> {
		let promise = new Promise((resolve, reject) => {
			delete item['id'];
			const keys = Object.keys(item);
			const values = JSON.stringify(Object.values(item)).replace(/[\[\]]/g, '');
			const query = `INSERT INTO ${this.tableName} (${keys}) VALUES (${values})`;

			MYSQL.connection.query(query, (err, res) => {
				if (err) return reject(err);
				resolve(res);
			});
		});
		return promise;
	}

	/**
	 * Delete item by 'id'
	 * @return Promise returns 'true' if item has successfully deleted otherwise ErrorObject
	 */
	async delete(id: number): Promise<any> {
		let promise = new Promise((resolve, reject) => {
			MYSQL.connection.query(`DELETE FROM ${this.tableName} WHERE id=${id}`, (err, res) => {
				if (err) return reject(err);
				
				const idFound = res.affectedRows > 0;
				resolve(idFound ? true : API_ERROR.NOT_FOUND);
			});
		});
		return promise;
	};

	async update(item: T): Promise<any> {
		const id = item['id'];
		delete item['id'];
		var keys = Object.keys(item);
		var values = Object.values(item);

		let query = `UPDATE ${this.tableName} SET `; 1
		// request generation (col_name=value)
		for (let i = 0; i < keys.length; i++) {
			query += `${keys[i]}=${JSON.stringify(values[i])}`;
			query += i < keys.length - 1 ? ',' : ' ';
		}
		query += `WHERE id=${id}`;

		let promise = new Promise((resolve, reject) => {
			MYSQL.connection.query(query, (err, res) => {
				if (err) return reject(err);
				const updated = res.affectedRows > 0;
				resolve(updated ? true : API_ERROR.NOT_FOUND);
			})
		});
		return promise;
	}

	/**
     * Select all rows from the database table
     * @return Promise<any>
     */
	async items(): Promise<any> {
		let promise = new Promise((resolve, reject) => {
			MYSQL.connection.query(`SELECT * FROM ${this.tableName}`, (err, rows) => {
				if (err) return reject(err);
				resolve(rows);
			});
		});
		return promise;
	};
}
