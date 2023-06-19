import { Router } from "express";
import { protect } from "../controllers/authController";
import { getAllRole, createRole, updateRole, deleteRole } from "../controllers/roleController";

// ////// TOURS router
const router = Router();

// CHAINING different middlewares
router
	.route("/")
	.get(protect, getAllRole)
	.post(protect, createRole);
router
	.route("/:id")
	.patch(protect, updateRole)
	.delete(protect, deleteRole);

export default router;
