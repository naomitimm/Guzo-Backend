import { Router } from "express";
import {
	getAllHotel,
	createHotel,
	getHotel,
	updateHotel,
	deleteHotel,
} from "../controllers/hotelController";
import { protect, restrictTo } from "../controllers/authController";

const router = Router();

// CHAINING different middlewares
router.route("/").get(getAllHotel).post(protect, restrictTo(1), createHotel);
router
	.route("/:id")
	.get(getHotel)
	.patch(protect, restrictTo(1), updateHotel)
	.delete(protect, restrictTo(1), deleteHotel);

export { router as hotels };
