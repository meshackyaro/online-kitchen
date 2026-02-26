import { Food } from "../models/food.models.js";
import { AppError } from "../utils/appError.js";

export const fetchAvailableFoods = async () => {
    return await Food.find({ isAvailable: true });
};

export const fetchFoodById = async (id) => {
    const food = await Food.findById(id);
    if (!food) {
        throw new AppError("Food item not found", 404);
    }
    return food;
};
