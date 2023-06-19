import { Router } from "express";
import {
	getAllLocation,
	createLocation,
	getLocation,
	updateLocation,
	deleteLocation,
} from "../controllers/locationController";
import { protect, restrictTo } from "../controllers/authController";

// ////// TOURS router
const router = Router();

// CHAINING different middlewares
router
	.route("/")
	.get(getAllLocation)
	.post(protect, restrictTo(1), createLocation);
router
	.route("/:id")
	.get(getLocation)
	.patch(protect, restrictTo(1), updateLocation)
	.delete(protect, restrictTo(1), deleteLocation);

export { router as locations };
