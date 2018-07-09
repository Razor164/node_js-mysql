import { RestController } from '../../services/router.service';
import { API_ERROR } from '../../models/constants/errors';
import { MYSQL } from '../../services/mysql.service';

const controller = new RestController('users');

// Get all users
controller.get('/', async function (req, res) {
	const users = await MYSQL.tables.users.items();
	
	res.send(users);
});

// Delete user
controller.delete('/:id', async function (req, res) {
	const id = parseInt(req.params.id);
	
	if (!id) return Promise.reject(API_ERROR.BAD_REQUEST);

	const result = await MYSQL.tables.users.delete(id);

	if (typeof result == 'object') return Promise.reject(result);
	res.send(result);
});

// Add user
controller.post('/', async function (req, res) {
	const user = req.body;
	if (!user) return Promise.reject(API_ERROR.BAD_REQUEST);
	const result = await MYSQL.tables.users.add(user);
	res.send(result);
});

// Update user
controller.put('/', async function (req, res) {
	const user = req.body;
	if (!user) return Promise.reject(API_ERROR.BAD_REQUEST);
	const result = await MYSQL.tables.users.update(user);
	res.send(result);
});

export const usersController = { controller: controller.instance, url: controller.baseUrl };