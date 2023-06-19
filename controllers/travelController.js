import { find, findById, create, findByIdAndUpdate, findByIdAndDelete } from "./../models/travelModel";
import APIFeatures from "./../utils/apiFeatures";

// HANDLER FUNCTIONS
// getting all Travel
export async function getAllTravel(req, res) {
	try {
		const features = new APIFeatures(find(), req.query)
			.filter()
			.sort()
			.limitFields()
			// .pagination();
		// EXECUTING QUERY
		const travels = await features.query;

		// SENDING RESPONSE
		res.status(200).json({
			status: "success",
			responseTime: req.requestTime,
			results: travels.length,
			data: {
				travels,
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

// a single Travel using parameters in our case is id
export async function getTravel(req, res) {
	try {
		const travel = await findById(req.params.id);
		res.status(200).json({
			status: "success",
			data: travel,
		});
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: " invalide id",
		});
	}
}

//// create new Travel
export async function createTravel(req, res) {
	try {
		const newTravel = await create(req.body);

		res.status(201).json({
			status: "sucess",
			data: {
				travel: newTravel,
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

// Updating Travel
export async function updateTravel(req, res) {
	try {
		const newTravel = await findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({
			status: "success",
			data: {
				travel: newTravel,
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

// Delete Travel
export async function deleteTravel(req, res) {
	try {
		const newTravel = await findByIdAndDelete(req.params.id);
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
