import { fetchAvailableFoods, fetchFoodById } from "../services/food.services.js";

export const getAllFoodsController = async (req, res) => {
    const foods = await fetchAvailableFoods();
    res.status(200).json({
        status: "SUCCESS",
        message: "Foods retrieved successfully",
        data: foods
    });
};

export const getFoodByIdController = async (req, res) => {
    const food = await fetchFoodById(req.params.id);
    res.status(200).json({
        status: "SUCCESS",
        message: "Food retrieved successfully",
        data: food
    });
};
