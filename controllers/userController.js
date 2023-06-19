import { find } from "./../models/userModel";
// ////// user route handler function
export async function getAllUsers(req, res, next) {
	const users = await find();

	res.status(200).json({
		status: "sucess",
		results: users.length,
		data: {
			users,
		},
	});
	next();
}

export function getUser(req, res) {
	res.status(500).json({
		status: "error",
		message: "route to be defined later",
	});
}
export function createUser(req, res) {
	res.status(500).json({
		status: "error",
		message: "route to be defined later",
	});
}
export function updateUser(req, res) {
	res.status(500).json({
		status: "error",
		message: "route to be defined later",
	});
}
export function deleteUser(req, res) {
	res.status(500).json({
		status: "error",
		message: "route to be defined later",
	});
}
