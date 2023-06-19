import { find, findById, create, findByIdAndUpdate, findByIdAndDelete } from "./../models/hotelRoomModel";
import APIFeatures from "./../utils/apiFeatures";

// HANDLER FUNCTIONS
// getting all HotelRoom 
export async function getAllHotelRoom(req, res) {
	try {
		const features = new APIFeatures(find(), req.query)
			.filter()
			.sort()
			.limitFields()
			// .pagination();
		// EXECUTING QUERY
		const hotelRooms = await features.query;

		// SENDING RESPONSE
		res.status(200).json({
			status: "success",
			responseTime: req.requestTime,
			results: hotelRooms.length,
			data: {
				hotelRooms,
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

// a single HotelRoom using parameters in our case is id
export async function getHotelRoom(req, res) {
	try {
		const hotelRoom = await findById(req.params.id);
		res.status(200).json({
			status: "success",
			data: hotelRoom,
		});
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: " invalide id",
		});
	}
}

//// create new HotelRoom
export async function createHotelRoom(req, res) {
	try {
		const newHotelRoom = await create(req.body);

		res.status(201).json({
			status: "sucess",
			data: {
				hotelRoom: newHotelRoom,
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

// Updating HotelRoom
export async function updateHotelRoom(req, res) {
	try {
		const newHotelRoom = await findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({
			status: "success",
			data: {
				hotelRoom: newHotelRoom,
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

// Delete HotelRoom
export async function deleteHotelRoom(req, res) {
	try {
		const newHotelRoom = await findByIdAndDelete(req.params.id);
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
