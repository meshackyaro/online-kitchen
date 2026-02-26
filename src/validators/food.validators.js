import { z } from "zod";

export const foodIdParamSchema = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Food ID")
});
