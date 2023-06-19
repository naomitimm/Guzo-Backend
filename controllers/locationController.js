import { find, findById, create, findByIdAndUpdate, findByIdAndDelete } from "./../models/locationModel";
import APIFeatures from "./../utils/apiFeatures";

// HANDLER FUNCTIONS
// getting all Location

export async function getAllLocation(req, res) {
	try {
		const features = new APIFeatures(find(), req.query)
			.filter()
			.sort()
			.limitFields()
			// .pagination();
		// EXECUTING QUERY
		const locations = await features.query;

		// SENDING RESPONSE
		res.status(200).json({
			status: "success",
			responseTime: req.requestTime,
			results: locations.length,
			data: {
				locations,
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

// a single Location using parameters in our case is id
export async function getLocation(req, res) {
	try {
		const location = await findById(req.params.id);
		res.status(200).json({
			status: "success",
			data: location,
		});
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: " invalide id",
		});
	}
}

//// create new Location
export async function createLocation(req, res) {
	try {
		const newLocation = await create(req.body);

		res.status(201).json({
			status: "sucess",
			data: {
				location: newLocation,
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

// Updating Location
export async function updateLocation(req, res) {
	try {
		const newLocation = await findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({
			status: "success",
			data: {
				location: newLocation,
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

// Delete Location
export async function deleteLocation(req, res) {
	try {
		const newLocation = await findByIdAndDelete(req.params.id);
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
