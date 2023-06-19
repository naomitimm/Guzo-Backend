import { Router } from "express";
import { getAllTravel, createTravel, getTravel, updateTravel, deleteTravel } from "../controllers/travelController";
import { protect, restrictTo } from '../controllers/authController';


const router = Router();

// CHAINING different middlewares
router
	.route("/")
	.get(getAllTravel)
	.post(protect, restrictTo(1), createTravel);
router
	.route("/:id")
	.get(getTravel)
	.patch(protect, restrictTo(1), updateTravel)
	.delete(protect, restrictTo(1), deleteTravel);

export default router;
