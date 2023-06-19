import { find, findById, create, findByIdAndUpdate, findByIdAndDelete } from "./../models/resourceModel";
import APIFeatures from "./../utils/apiFeatures";

// HANDLER FUNCTIONS
// getting all Resource


export async function getAllResource(req, res) {
	try {
		const features = new APIFeatures(find(), req.query)
			.filter()
			.sort()
			.limitFields()
			.pagination();
		// EXECUTING QUERY
		const resources = await features.query;

		// SENDING RESPONSE
		res.status(200).json({
			status: "success",
			responseTime: req.requestTime,
			results: resources.length,
			data: {
				resources,
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

// a single Resource using parameters in our case is id
export async function getResource(req, res) {
	try {
		const resource = await findById(req.params.id);
		res.status(200).json({
			status: "success",
			data: resource,
		});
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: " invalide id",
		});
	}
}

//// create new Resource
export async function createResource(req, res) {
	try {
		const newResource = await create(req.body);

		res.status(201).json({
			status: "sucess",
			data: {
				resource: newResource,
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

// Updating Resource
export async function updateResource(req, res) {
	try {
		const newResource = await findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({
			status: "success",
			data: {
				resource: newResource,
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

// Delete Resource
export async function deleteResource(req, res) {
	try {
		const newResource = await findByIdAndDelete(req.params.id);
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
