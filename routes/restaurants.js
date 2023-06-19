import { Router } from "express";
import {
	getAllRestaurant,
	createRestaurant,
	getRestaurant,
	updateRestaurant,
	deleteRestaurant,
} from "../controllers/restaurantController";
import { protect, restrictTo } from "../controllers/authController";

const router = Router();

// CHAINING different middlewares
router
	.route("/")
	.get(getAllRestaurant)
	.post(protect, restrictTo(1), createRestaurant);
router
	.route("/:id")
	.get(getRestaurant)
	.patch(protect, restrictTo(1), updateRestaurant)
	.delete(protect, restrictTo(1), deleteRestaurant);

export { router as restaurants };
