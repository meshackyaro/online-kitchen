import { getCartForUser, addItemToCart, removeItemFromCart, emptyCart } from "../services/cart.services.js";

export const getCartController = async (req, res) => {
    const cart = await getCartForUser(req.user.sub);
    res.status(200).json({
        status: "SUCCESS",
        message: "Cart retrieved successfully",
        data: cart
    });
};

export const addToCartController = async (req, res) => {
    const { foodId, quantity } = req.body;
    const cart = await addItemToCart(req.user.sub, foodId, quantity);
    res.status(200).json({
        status: "SUCCESS",
        message: "Item added to cart",
        data: cart
    });
};

export const removeFromCartController = async (req, res) => {
    const { foodId } = req.params;
    const cart = await removeItemFromCart(req.user.sub, foodId);
    res.status(200).json({
        status: "SUCCESS",
        message: "Item removed from cart",
        data: cart
    });
};

export const clearCartController = async (req, res) => {
    const cart = await emptyCart(req.user.sub);
    res.status(200).json({
        status: "SUCCESS",
        message: "Cart cleared successfully",
        data: cart
    });
};
