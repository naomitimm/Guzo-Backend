import { find, findById, create, findByIdAndUpdate, findByIdAndDelete } from "./../models/mealModel";
import APIFeatures from "./../utils/apiFeatures";

// HANDLER FUNCTIONS
// getting all Meals
export async function getAllMeal(req, res) {
	try {
		const features = new APIFeatures(find(), req.query)
			.filter()
			.sort()
			.limitFields()
			.pagination();
		// EXECUTING QUERY
		const meals = await features.query;

		// SENDING RESPONSE
		res.status(200).json({
			status: "success",
			responseTime: req.requestTime,
			results: meals.length,
			data: {
				meals,
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

// a single Meal using parameters in our case is id
export async function getMeal(req, res) {
	try {
		const meal = await findById(req.params.id);
		res.status(200).json({
			status: "success",
			data: meal,
		});
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: " invalide id",
		});
	}
}

//// create new Meal
export async function createMeal(req, res) {
	try {
		const newMeal = await create(req.body);

		res.status(201).json({
			status: "sucess",
			data: {
				meal: newMeal,
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

// Updating Meal
export async function updateMeal(req, res) {
	try {
		const newMeal = await findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({
			status: "success",
			data: {
				meal: newMeal,
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

// Delete Meal
export async function deleteMeal(req, res) {
	try {
		const newMeal = await findByIdAndDelete(req.params.id);
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
