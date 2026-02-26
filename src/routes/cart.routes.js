import { Router } from "express";
import { getCartController, addToCartController, removeFromCartController, clearCartController } from "../controllers/cart.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { addToCartSchema } from "../validators/cart.validators.js";

const router = Router();

router.use(protect);

router.get("/", asyncHandler(getCartController));
router.post("/add", validate(addToCartSchema), asyncHandler(addToCartController));
router.delete("/:foodId", asyncHandler(removeFromCartController));
router.delete("/", asyncHandler(clearCartController));

export default router;
