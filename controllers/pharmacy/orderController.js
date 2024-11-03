// backend/controllers/orderController.js
import Order from "../../models/pharmacy/pOrder.model.js"

export const addOrder = async (req, res) => {
  const { orderItems, totalPrice } = req.body;

  const order = new Order({
    user: req.user._id,
    orderItems,
    totalPrice,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
};

export const getOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('orderItems.drug');
  res.json(orders);
};


export const getAOrder = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (order) {
      res.json(order);
  } else {
      res.status(404).json({ message: 'Order not found' });
  }
}

export const orderStatus = async(req, res) => {

    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(order);

}