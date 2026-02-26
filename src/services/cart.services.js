import { Cart } from "../models/cart.models.js";
import { Food } from "../models/food.models.js";
import { AppError } from "../utils/appError.js";

export const getCartForUser = async (userId) => {
    let cart = await Cart.findOne({ user: userId }).populate("items.food");
    if (!cart) {
        cart = await Cart.create({ user: userId, items: [] });
    }
    return cart;
};

export const addItemToCart = async (userId, foodId, quantity) => {
    const food = await Food.findById(foodId);
    if (!food) {
        throw new AppError("Food item not found", 404);
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
        cart = new Cart({ user: userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.food.toString() === foodId);
    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
    } else {
        cart.items.push({ food: foodId, quantity });
    }

    await cart.save();
    return await Cart.findById(cart._id).populate("items.food");
};

export const removeItemFromCart = async (userId, foodId) => {
    let cart = await Cart.findOne({ user: userId });
    
    if (cart) {
        cart.items = cart.items.filter(item => item.food.toString() !== foodId);
        await cart.save();
    }

    return await Cart.findOne({ user: userId }).populate("items.food");
};

export const emptyCart = async (userId) => {
    let cart = await Cart.findOne({ user: userId });
    if (cart) {
        cart.items = [];
        await cart.save();
    }
    return cart;
};
