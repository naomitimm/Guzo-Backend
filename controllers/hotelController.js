import { find, findById, create, findByIdAndUpdate, findByIdAndDelete } from "./../models/hotelModel";
import APIFeatures from "./../utils/apiFeatures";

// HANDLER FUNCTIONS

// getting all Hotel

export async function getAllHotel(req, res) {
	try {
		const features = new APIFeatures(find(), req.query)
			.filter()
			.sort()
			.limitFields()
			// .pagination();
		// EXECUTING QUERY
		const hotels = await features.query;

		// SENDING RESPONSE
		res.status(200).json({
			status: "success",
			responseTime: req.requestTime,
			results: hotels.length,
			data: {
				hotels,
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

// a single Hotel using parameters in our case is id
export async function getHotel(req, res) {
	try {
		const hotel = await findById(req.params.id);
		res.status(200).json({
			status: "success",
			data: hotel,
		});
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: " invalide id",
		});
	}
}

//// create new Hotel
export async function createHotel(req, res) {
	try {
		const newHotel = await create(req.body);

		res.status(201).json({
			status: "sucess",
			data: {
				hotel: newHotel,
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

// Updating Hotel
export async function updateHotel(req, res) {
	try {
		const newHotel = await findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({
			status: "success",
			data: {
				hotel: newHotel,
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

// Delete Hotel
export async function deleteHotel(req, res) {
	try {
		const newHotel = await findByIdAndDelete(req.params.id);
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
