import { find, findById, create, findByIdAndUpdate, findByIdAndDelete } from "./../models/restaurantBookingModel";
import APIFeatures from "./../utils/apiFeatures";

// HANDLER FUNCTIONS
// getting all RestaurantBookings

export async function getAllRestaurantBooking(req, res) {
	try {
		const features = new APIFeatures(find(), req.query)
			.filter()
			.sort()
			.limitFields()
			.pagination();
		// EXECUTING QUERY
		const restaurantBooking = await features.query;

		// SENDING RESPONSE
		res.status(200).json({
			status: "success",
			responseTime: req.requestTime,
			results: restaurantBooking.length,
			data: {
				restaurantBooking,
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

// a single RestaurantBooking using parameters in our case is id
export async function getRestaurantBooking(req, res) {
	try {
		const restaurantBooking = await findById(req.params.id);
		res.status(200).json({
			status: "success",
			data: restaurantBooking,
		});
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: " invalide id",
		});
	}
}

//// create new RestaurantBooking
export async function createRestaurantBooking(req, res) {
	try {
		const newRestaurantBooking = await create(req.body);

		res.status(201).json({
			status: "sucess",
			data: {
				restaurantBooking: newRestaurantBooking,
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

// Updating RestaurantBooking
export async function updateRestaurantBooking(req, res) {
	try {
		const newRestaurantBooking = await findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({
			status: "success",
			data: {
				restaurantBooking: newRestaurantBooking,
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

// Delete RestaurantBooking
export async function deleteRestaurantBooking(req, res) {
	try {
		const newRestaurantBooking = await findByIdAndDelete(req.params.id);
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
