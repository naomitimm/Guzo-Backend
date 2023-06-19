import { find, findById, create, findByIdAndUpdate, findByIdAndDelete } from "./../models/hotelBookingModel";
import APIFeatures from "./../utils/apiFeatures";

// HANDLER FUNCTIONS


export async function getAllHotelBooking(req, res) {
	try {
		const features = new APIFeatures(find(), req.query)
			.filter()
			.sort()
			.limitFields()
			.pagination();
		// EXECUTING QUERY
		const hotelBooking = await features.query;

		// SENDING RESPONSE
		res.status(200).json({
			status: "success",
			responseTime: req.requestTime,
			results: hotelBooking.length,
			data: {
				hotelBooking,
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

// a single HotelBooking using parameters in our case is id
export async function getHotelBooking(req, res) {
	try {
		const hotelBooking = await findById(req.params.id);
		res.status(200).json({
			status: "success",
			data: hotelBooking,
		});
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: " invalide id",
		});
	}
}

//// create new HotelBooking
export async function createHotelBooking(req, res) {
	try {
		const newHotelBooking = await create(req.body);

		res.status(201).json({
			status: "sucess",
			data: {
				hotelBooking: newHotelBooking,
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

// Updating HotelBooking
export async function updateHotelBooking(req, res) {
	try {
		const newHotelBooking = await findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({
			status: "success",
			data: {
				hotelBooking: newHotelBooking,
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

// Delete HotelBooking
export async function deleteHotelBooking(req, res) {
	try {
		const newHotelBooking = await findByIdAndDelete(req.params.id);
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
