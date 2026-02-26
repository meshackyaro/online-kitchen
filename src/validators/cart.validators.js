import { z } from "zod";

export const addToCartSchema = z.object({
    foodId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Food ID"),
    quantity: z.number().int().positive().optional().default(1)
});

export const removeFromCartSchema = z.object({
    params: z.object({
        foodId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Food ID")
    })
});
