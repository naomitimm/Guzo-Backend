import { find, findById, create, findByIdAndUpdate, findByIdAndDelete } from "./../models/activityModel";
import APIFeatures from "./../utils/apiFeatures";

// HANDLER FUNCTIONS
// getting all activity
export function aliasTopActivity(req, res, next) {
	(req.query.limit = "3"), (req.query.sort = "price");
	next();
}

export async function getAllActivity(req, res) {
	try {
		const features = new APIFeatures(find(), req.query)
			.filter()
			.sort()
			.limitFields()
			// .pagination();
		// EXECUTING QUERY
		const activities = await features.query;

		// SENDING RESPONSE
		res.status(200).json({
			status: "success",
			responseTime: req.requestTime,
			results: activities.length,
			data: {
				activities,
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

// a single activity using parameters in our case is id
export async function getActivity(req, res) {
	try {
		const activity = await findById(req.params.id);
		res.status(200).json({
			status: "success",
			data: activity,
		});
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: " invalide id",
		});
	}
}

//// create new activity
export async function createActivity(req, res) {
	try {
		const newActivity = await create(req.body);

		res.status(201).json({
			status: "sucess",
			data: {
				activity: newActivity,
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

// Updating activity
export async function updateActivity(req, res) {
	try {
		const newActivity = await findByIdAndUpdate(
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
				activity: newActivity,
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

// Delete activity
export async function deleteActivity(req, res) {
	try {
		const newActivity = await findByIdAndDelete(req.params.id);
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
