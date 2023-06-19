import { find, findById, create, findByIdAndUpdate, findByIdAndDelete } from "./../models/roleModel";
import APIFeatures from "./../utils/apiFeatures";

// HANDLER FUNCTIONS
// getting all Roles
export async function getAllRole(req, res) {
	try {
		const features = new APIFeatures(find(), req.query)
			.filter()
			.sort()
			.limitFields()
			.pagination();
		// EXECUTING QUERY
		const roles = await features.query;

		// SENDING RESPONSE
		res.status(200).json({
			status: "success",
			responseTime: req.requestTime,
			results: roles.length,
			data: {
				roles,
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

// a single Role using parameters in our case is id
export async function getRole(req, res) {
	try {
		const role = await findById(req.params.id);
		res.status(200).json({
			status: "success",
			data: role,
		});
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: " invalide id",
		});
	}
}

//// create new Role
export async function createRole(req, res) {
	try {
		const newRole = await create(req.body);

		res.status(201).json({
			status: "sucess",
			data: {
				role: newRole,
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

// Updating Role
export async function updateRole(req, res) {
	try {
		const newRole = await findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({
			status: "success",
			data: {
				role: newRole,
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

// Delete Role
export async function deleteRole(req, res) {
	try {
		const newRole = await findByIdAndDelete(req.params.id);
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
