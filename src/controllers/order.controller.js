import { createOrderFromCart, fetchUserOrderHistory, fetchOrderById, updateOrderStatus } from "../services/order.services.js";

export const placeOrderController = async (req, res) => {
    const { deliveryAddress } = req.body;
    const order = await createOrderFromCart(req.user.sub, deliveryAddress);
    res.status(201).json({
        status: "SUCCESS",
        message: "Order placed successfully",
        data: order
    });
};

export const getUserOrdersController = async (req, res) => {
    const orders = await fetchUserOrderHistory(req.user.sub);
    res.status(200).json({
        status: "SUCCESS",
        message: "Orders retrieved successfully",
        data: orders
    });
};

export const getOrderByIdController = async (req, res) => {
    const order = await fetchOrderById(req.user.sub, req.params.id);
    res.status(200).json({
        status: "SUCCESS",
        message: "Order retrieved successfully",
        data: order
    });
};

export const updateOrderStatusController = async (req, res) => {
    const { status } = req.body;
    const { id: orderId } = req.params;
    const order = await updateOrderStatus(req.user.sub, orderId, status);
    res.status(200).json({
        status: "SUCCESS",
        message: "Order status updated successfully",
        data: order
    });
};
