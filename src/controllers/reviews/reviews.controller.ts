import { RestController } from '../../services/router.service';
import { API_ERROR } from '../../models/constants/errors';
import { IReview } from '../../models/interfaces/review';
import { MYSQL } from '../../services/mysql.service';
import { SortMethods } from '../../core/sort-methods';

const controller = new RestController('reviews');

// Get reviews
controller.get('/', async function (req, res) {
	const count = req.query.last;
	const reviews = await MYSQL.tables.reviews.items();
	if (!reviews.length) return Promise.reject(API_ERROR.NOT_FOUND);
	res.send(reviews.sort((a, b) =>
		SortMethods.sortByDateDesc(a.date, b.date)).slice(0, count || reviews.length));
});

// Get review by id
controller.get('/:id', async function (req, res) {
	const id = req.params.id;
	const reviews = await MYSQL.tables.reviews.items();
	const review = reviews.find(r => r.id == id);
	if (!review) return Promise.reject(API_ERROR.NOT_FOUND);
	res.send(review);
});

// Add review
controller.post('/', async function (req, res) {
	const review: IReview = req.body;
	console.log(review);
	
	res.send(MYSQL.tables.reviews.add(review));
});

export const reviewsController = { controller: controller.instance, url: controller.baseUrl };