import { RestController } from '../../services/router.service';
import { API_ERROR } from '../../models/constants/errors';
import { MYSQL } from '../../services/mysql.service';
import { Table } from '../../models/classes/table';

export class CommonController {

	private controller: RestController;
	instance: any;
	url: string;
	table: Table<any>;

	constructor(table: Table<any>, url: string) {
		this.url = url;
		this.table = table;
		this.controller = new RestController(url);
		this.instance = this.controller.instance;

		// Get all items
		this.controller.get('/', async function (req, res) {
			const items = await table.items();

			res.send(items);
		});

		// Delete item
		this.controller.delete('/:id', async function (req, res) {
			const id = parseInt(req.params.id);

			if (!id) return Promise.reject(API_ERROR.BAD_REQUEST);

			const result = await table.delete(id);

			if (typeof result === 'object') return Promise.reject(result);
			res.send(result);
		});

		// Add item
		this.controller.post('/', async function (req, res) {
			const item = req.body;
			if (!item) return Promise.reject(API_ERROR.BAD_REQUEST);
			const result = await table.add(item);
			res.send(result);
		});

		// Update item
		this.controller.put('/', async function (req, res) {
			const item = req.body;
			if (!item) return Promise.reject(API_ERROR.BAD_REQUEST);
			const result = await table.update(item);
			res.send(result);
		});
	}


}

const usersController = new CommonController(MYSQL.tables.users, 'users');
const reviewsController = new CommonController(MYSQL.tables.reviews, 'reviews');
const rolesController = new CommonController(MYSQL.tables.roles, 'roles');
const categoriesController = new CommonController(MYSQL.tables.businessCategories, 'categories');

export const COMMON_CONTROLLERS = [
	usersController,
	reviewsController,
	rolesController,
	categoriesController,
];