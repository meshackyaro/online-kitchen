import { z } from "zod";

export const placeOrderSchema = z.object({
    deliveryAddress: z.string().min(5, "Delivery address must be at least 5 characters long")
});

export const orderIdParamSchema = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Order ID")
});

export const updateOrderStatusSchema = z.object({
    status: z.enum(["Pending", "Preparing", "Out for Delivery", "Delivered", "Cancelled"])
});
