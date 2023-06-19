import { Router } from "express";
import { restrictTo, protect } from "../controllers/authController";
import { getAllHotelBooking, createHotelBooking, getHotelBooking, updateHotelBooking, deleteHotelBooking } from "../controllers/hotelBookingController";

// ////// TOURS router
const router = Router();

// CHAINING different middlewares
router
	.route("/")
	.get(restrictTo(1), getAllHotelBooking)
	.post(protect, createHotelBooking);
router
	.route("/:id")
	.get(protect, getHotelBooking)
	.patch(protect, updateHotelBooking)
	.delete(protect, deleteHotelBooking);

export default router;
