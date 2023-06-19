import { find, findById, create, findByIdAndUpdate, findByIdAndDelete } from "./../models/locationTypeModel";
import APIFeatures from "./../utils/apiFeatures";

// HANDLER FUNCTIONS
// getting all LocationType
export async function getAllLocationType(req, res) {
	try {
		const features = new APIFeatures(find(), req.query)
			.filter()
			.sort()
			.limitFields()
			// .pagination();
		// EXECUTING QUERY
		const locationTypes = await features.query;

		// SENDING RESPONSE
		res.status(200).json({
			status: "success",
			responseTime: req.requestTime,
			results: locationTypes.length,
			data: {
				locationTypes,
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

// a single LocationType using parameters in our case is id
export async function getLocationType(req, res) {
	try {
		const locationType = await findById(req.params.id);
		res.status(200).json({
			status: "success",
			data: locationType,
		});
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: " invalide id",
		});
	}
}

//// create new LocationType
export async function createLocationType(req, res) {
	try {
		const newLocationType = await create(req.body);

		res.status(201).json({
			status: "sucess",
			data: {
				locationType: newLocationType,
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

// Updating LocationType
export async function updateLocationType(req, res) {
	try {
		const newLocationType = await findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({
			status: "success",
			data: {
				locationType: newLocationType,
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

// Delete LocationType
export async function deleteLocationType(req, res) {
	try {
		const newLocationType = await findByIdAndDelete(req.params.id);
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
