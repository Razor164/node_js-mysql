import { RestController } from '../../services/router.service';
import { IReviewInvite } from '../../models/interfaces/invite';
import { MYSQL } from '../../services/mysql.service';
import { API_ERROR } from '../../models/constants/errors';

const controller = new RestController('public');

// Get all review invites
controller.get('/invites', async function (req, res) {
	// res.send(MYSQL.tables.invites.items);
});

// Send review invite
controller.post<void>('/invites', async function (req, res) {
	const invite: IReviewInvite = req.body;
	// res.send(MYSQL.tables.invites.add(invite));
});

// Delete review invite
controller.delete<void>('/invites/:id', async function (req, res) {
	const id = parseInt(req.params.id);
	
	if (!id) return Promise.reject(API_ERROR.BAD_REQUEST);
	
	// if (!MYSQL.tables.invites.delete(id))
	// 	return Promise.reject(API_ERROR.NOT_FOUND);
});

export const publicController = { controller: controller.instance, url: controller.baseUrl };