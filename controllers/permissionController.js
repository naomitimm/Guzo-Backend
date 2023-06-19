import { find, findById, create, findByIdAndUpdate, findByIdAndDelete } from "./../models/permissionModel";
import APIFeatures from "./../utils/apiFeatures";

// HANDLER FUNCTIONS
// getting all Permission
export async function getAllPermission(req, res) {
	try {
		const features = new APIFeatures(find(), req.query)
			.filter()
			.sort()
			.limitFields()
			.pagination();
		// EXECUTING QUERY
		const permissions = await features.query;

		// SENDING RESPONSE
		res.status(200).json({
			status: "success",
			responseTime: req.requestTime,
			results: permissions.length,
			data: {
				permissions,
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

// a single Permission using parameters in our case is id
export async function getPermission(req, res) {
	try {
		const permission = await findById(req.params.id);
		res.status(200).json({
			status: "success",
			data: permission,
		});
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: " invalide id",
		});
	}
}

//// create new Permission
export async function createPermission(req, res) {
	try {
		const newPermission = await create(req.body);

		res.status(201).json({
			status: "sucess",
			data: {
				permission: newPermission,
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

// Updating Permission
export async function updatePermission(req, res) {
	try {
		const newPermission = await findByIdAndUpdate(
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
				permission: newPermission,
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

// Delete Permission
export async function deletePermission(req, res) {
	try {
		const newPermission = await findByIdAndDelete(req.params.id);
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
