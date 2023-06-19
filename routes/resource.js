import { Router } from "express";
import { getAllResource, createResource, updateResource, deleteResource } from "../controllers/resourceController";
import { protect } from '../controllers/authController';


// ////// TOURS router
const router = Router();

// CHAINING different middlewares
router
	.route("/")
	.get(getAllResource)
	.post(protect, createResource);
router
	.route("/:id")
	.patch(protect, updateResource)
	.delete(protect, deleteResource);

export default router;
