import { find, findById, create, findByIdAndUpdate, findByIdAndDelete } from "./../models/travelBookingModel";
import APIFeatures from "./../utils/apiFeatures";

// HANDLER FUNCTIONS
// getting all TravelBooking
export async function getAllTravelBooking(req, res) {
	try {
		const features = new APIFeatures(find(), req.query)
			.filter()
			.sort()
			.limitFields()
			.pagination();
		// EXECUTING QUERY
		const travelBookings = await features.query;

		// SENDING RESPONSE
		res.status(200).json({
			status: "success",
			responseTime: req.requestTime,
			results: travelBookings.length,
			data: {
				travelBookings,
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

// a single TravelBooking using parameters in our case is id
export async function getTravelBooking(req, res) {
	try {
		const travelBooking = await findById(req.params.id);
		res.status(200).json({
			status: "success",
			data: travelBooking,
		});
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: " invalide id",
		});
	}
}

//// create new TravelBooking
export async function createTravelBooking(req, res) {
	try {
		const newTravelBooking = await create(req.body);

		res.status(201).json({
			status: "sucess",
			data: {
				travelBooking: newTravelBooking,
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

// Updating TravelBooking
export async function updateTravelBooking(req, res) {
	try {
		const newTravelBooking = await findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);
		res.status(200).json({
			status: "success",
			data: {
				travelBooking: newTravelBooking,
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

// Delete TravelBooking
export async function deleteTravelBooking(req, res) {
	try {
		const newTravelBooking = await findByIdAndDelete(
			req.params.id
		);
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
