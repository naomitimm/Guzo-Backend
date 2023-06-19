import { Router } from "express";
import { aliasTopActivity, getAllActivity, createActivity, getActivity, updateActivity, deleteActivity } from "../controllers/activityController";
import { protect, restrictTo } from '../controllers/authController';


const router = Router();

// CHAINING different middlewares
router
	.route("/top-5-cheap")
	.get(aliasTopActivity, getAllActivity)

router
	.route("/")
	.get(getAllActivity)
	.post(protect, restrictTo(1), createActivity);
router
	.route("/:id")
	.get(getActivity)
	.patch(protect, restrictTo(1), updateActivity)
	.delete(protect, restrictTo(1), deleteActivity);

export default router;
