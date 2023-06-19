import { find, findById, create, findByIdAndUpdate, findByIdAndDelete } from "./../models/restaurantModel";
import APIFeatures from "./../utils/apiFeatures";

// HANDLER FUNCTIONS
// getting all Restaurant
export function aliasTopRestaurant(req, res, next) {
	(req.query.limit = "5"), (req.query.sort = "review");
	next();
}

export async function getAllRestaurant(req, res) {
	try {
		const features = new APIFeatures(find(), req.query)
			.filter()
			.sort()
			.limitFields()
			// .pagination();
		// EXECUTING QUERY
		const restaurants = await features.query;

		// SENDING RESPONSE
		res.status(200).json({
			status: "success",
			responseTime: req.requestTime,
			results: restaurants.length,
			data: {
				restaurants,
			},
		});
	} catch (err) {
		res.status(404).json({
			data: {
				status: "fail",
				message: err,
			},
		});
	}
}

// a single Restaurant using parameters in our case is id
export async function getRestaurant(req, res) {
	try {
		const restaurant = await findById(req.params.id);
		res.status(200).json({
			status: "success",
			data: restaurant,
		});
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: " invalide id",
		});
	}
}

//// create new Restaurant
export async function createRestaurant(req, res) {
	try {
		const newRestaurant = await create(req.body);

		res.status(201).json({
			status: "sucess",
			data: {
				restaurant: newRestaurant,
			},
		});
	} catch (err) {
		res.status(404).json({
			data: {
				status: "fail",
				message: err,
			},
		});
	}
}

// Updating Restaurant
export async function updateRestaurant(req, res) {
	try {
		const newRestaurant = await findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({
			status: "success",
			data: {
				restaurant: newRestaurant,
			},
		});
	} catch (err) {
		res.status(404).json({
			data: {
				status: "fail",
				message: "error updating",
			},
		});
	}
}

// Delete Restaurant
export async function deleteRestaurant(req, res) {
	try {
		const newRestaurant = await findByIdAndDelete(req.params.id);
		res.status(204).json({
			status: "success",
			data: null,
		});
	} catch (err) {
		res.status(404).json({
			data: {
				status: "fail",
				message: "error deleting",
			},
		});
	}
}
