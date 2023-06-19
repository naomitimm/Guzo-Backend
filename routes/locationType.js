import { Router } from "express";
import { getAllLocationType, createLocationType, getLocationType, updateLocationType, deleteLocationType } from "../controllers/locationTypeController";
import { protect, restrictTo } from "../controllers/authController";

// ////// TOURS router
const router = Router();

// CHAINING different middlewares
router
	.route("/")
	.get(getAllLocationType)
	.post(protect, restrictTo(1),  createLocationType);
router
	.route("/:id")
	.get(getLocationType)
	.patch(protect, restrictTo(1), updateLocationType)
	.delete(protect, restrictTo(1), deleteLocationType);

export default router;
