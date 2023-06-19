import { find, findById, create, findByIdAndUpdate, findByIdAndDelete } from "./../models/tourGuideModel";
import APIFeatures from "./../utils/apiFeatures";

// HANDLER FUNCTIONS
// getting all TourGuides
export async function getAllTourGuide(req, res) {
	try {
		const features = new APIFeatures(find(), req.query)
			.filter()
			.sort()
			.limitFields()
			// .pagination();
		// EXECUTING QUERY
		const tourGuides = await features.query;

		// SENDING RESPONSE
		res.status(200).json({
			status: "success",
			responseTime: req.requestTime,
			results: tourGuides.length,
			data: {
				tourGuides,
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

// a single TourGuide using parameters in our case is id
export async function getTourGuide(req, res) {
	try {
		const tourGuide = await findById(req.params.id);
		res.status(200).json({
			status: "success",
			data: tourGuide,
		});
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: " invalide id",
		});
	}
}

//// create new touTourGuider
export async function createTourGuide(req, res) {
	try {
		const newTourGuide = await create(req.body);

		res.status(201).json({
			status: "sucess",
			data: {
				tourGuide: newTourGuide,
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

// Updating TourGuide
export async function updateTourGuide(req, res) {
	try {
		const newTourGuide = await findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({
			status: "success",
			data: {
				tourGuide: newTourGuide,
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

// Delete TourGuide
export async function deleteTourGuide(req, res) {
	try {
		const newTourGuide = await findByIdAndDelete(req.params.id);
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
