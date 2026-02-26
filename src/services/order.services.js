import { Order } from "../models/order.models.js";
import { Cart } from "../models/cart.models.js";
import { Food } from "../models/food.models.js";
import { AppError } from "../utils/appError.js";

export const createOrderFromCart = async (userId, deliveryAddress) => {
    const cart = await Cart.findOne({ user: userId }).populate("items.food");
    if (!cart || cart.items.length === 0) {
        throw new AppError("Cart is empty", 400);
    }

    const orderItems = [];
    let totalAmount = 0;

    for (const item of cart.items) {
        const food = await Food.findById(item.food._id);
        
        if (!food || !food.isAvailable) {
            throw new AppError(`Food item "${item.food.name}" is no longer available`, 400);
        }

        const itemPrice = food.price;
        const itemQuantity = item.quantity;
        const subtotal = itemPrice * itemQuantity;

        orderItems.push({
            food: food._id,
            name: food.name,
            price: itemPrice,
            quantity: itemQuantity
        });

        totalAmount += subtotal;
    }

    const order = await Order.create({
        user: userId,
        items: orderItems,
        totalAmount,
        deliveryAddress,
        status: "Pending"
    });

    // Clear cart after placing order
    cart.items = [];
    await cart.save();

    return order;
};

export const fetchUserOrderHistory = async (userId) => {
    return await Order.find({ user: userId }).sort({ createdAt: -1 });
};

export const fetchOrderById = async (userId, orderId) => {
    const order = await Order.findOne({ _id: orderId, user: userId });
    if (!order) {
        throw new AppError("Order not found", 404);
    }
    return order;
};

export const updateOrderStatus = async (userId, orderId, status) => {
    // Note: In a real app, only admins might update status, or users might cancel.
    // For now, we allow the request to proceed if the order exists.
    const order = await Order.findOne({ _id: orderId, user: userId });
    if (!order) {
        throw new AppError("Order not found", 404);
    }

    order.status = status;
    await order.save();
    return order;
};
