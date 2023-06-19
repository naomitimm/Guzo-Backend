import { Router } from "express";
import {
	getAllTravelBooking,
	createTravelBooking,
	getTravelBooking,
	updateTravelBooking,
	deleteTravelBooking,
} from "../controllers/travelBookingController";
import { protect, restrictTo } from "../controllers/authController";

const router = Router();

// CHAINING different middlewares
router
	.route("/")
	.get(protect, restrictTo(1), getAllTravelBooking)
	.post(protect, createTravelBooking);
router
	.route("/:id")
	.get(protect, getTravelBooking)
	.patch(protect, updateTravelBooking)
	.delete(protect, deleteTravelBooking);

export { router as travelBooking };
