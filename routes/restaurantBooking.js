import { Router } from "express";
import { getAllRestaurantBooking, createRestaurantBooking, getRestaurantBooking, updateRestaurantBooking, deleteRestaurantBooking } from "../controllers/restaurantBookingController";
import { protect, restrictTo } from "../controllers/authController";

// ////// TOURS router
const router = Router();

// CHAINING different middlewares
router
	.route("/")
	.get(
		protect,
		restrictTo(1),
		getAllRestaurantBooking
	)
	.post(
		protect,
		createRestaurantBooking
	);
router
	.route("/:id")
	.get(protect, getRestaurantBooking)
	.patch(
		protect,
		updateRestaurantBooking
	)
	.delete(
		protect,
		deleteRestaurantBooking
	);

export default router;
