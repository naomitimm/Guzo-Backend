import { Router } from "express";
import {
	getAllPermission,
	createPermission,
	updatePermission,
	deletePermission,
} from "../controllers/permissionController";
import { protect } from "../controllers/authController";

// ////// TOURS router
const router = Router();

// CHAINING different middlewares
router
	.route("/")
	.get(protect, getAllPermission)
	.post(protect, createPermission);
router
	.route("/:id")
	.patch(protect, updatePermission)
	.delete(protect, deletePermission);

export { router as permissions };
