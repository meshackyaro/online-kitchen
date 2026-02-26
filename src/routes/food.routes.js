import { Router } from "express";
import { getAllFoodsController, getFoodByIdController } from "../controllers/food.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(getAllFoodsController));
router.get("/:id", asyncHandler(getFoodByIdController));

export default router;
