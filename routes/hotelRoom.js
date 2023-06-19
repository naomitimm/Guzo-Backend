import { Router } from "express";
import {
	getAllHotelRoom,
	createHotelRoom,
	getHotelRoom,
	updateHotelRoom,
	deleteHotelRoom,
} from "../controllers/hotelRoomController";
import { protect, restrictTo } from "../controllers/authController";

const router = Router();

// CHAINING different middlewares
router
	.route("/")
	.get(getAllHotelRoom)
	.post(protect, restrictTo(1), createHotelRoom);
router
	.route("/:id")
	.get(getHotelRoom)
	.patch(protect, restrictTo(1), updateHotelRoom)
	.delete(protect, restrictTo(1), deleteHotelRoom);

export { router as hotelRoom };
