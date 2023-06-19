import { Router } from "express";
import {
	getAllTourGuide,
	createTourGuide,
	getTourGuide,
	updateTourGuide,
	deleteTourGuide,
} from "../controllers/tourGuideController";
import { protect, restrictTo } from "../controllers/authController";

// ////// TOURS router
const router = Router();

// CHAINING different middlewares
router
	.route("/")
	.get(getAllTourGuide)
	.post(protect, restrictTo(1), createTourGuide);
router
	.route("/:id")
	.get(getTourGuide)
	.patch(protect, restrictTo(1), updateTourGuide)
	.delete(protect, restrictTo(1), deleteTourGuide);

export { router as tourGuides };
