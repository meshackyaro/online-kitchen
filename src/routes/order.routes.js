import { Router } from "express";
import { placeOrderController, getUserOrdersController, getOrderByIdController, updateOrderStatusController } from "../controllers/order.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { placeOrderSchema, updateOrderStatusSchema } from "../validators/order.validators.js";

const router = Router();

router.use(protect);

router.post("/", validate(placeOrderSchema), asyncHandler(placeOrderController));
router.get("/", asyncHandler(getUserOrdersController));
router.get("/:id", asyncHandler(getOrderByIdController));
router.patch("/:id/status", validate(updateOrderStatusSchema), asyncHandler(updateOrderStatusController));

export default router;
