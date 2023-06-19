import { Router } from "express";
import { getAllMeal, createMeal, getMeal, updateMeal, deleteMeal } from "../controllers/mealController";
import { protect, restrictTo } from '../controllers/authController';


// ////// TOURS router
const router = Router();

// CHAINING different middlewares
router
	.route("/")
	.get(getAllMeal)
	.post(protect, restrictTo(1), createMeal);
router
	.route("/:id")
	.get(getMeal)
	.patch(protect, restrictTo(1),  updateMeal)
	.delete(protect, restrictTo(1), deleteMeal);

export default router;
