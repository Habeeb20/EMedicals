import express from "express"
import Order from "../../models/pharmacy/pOrder.model.js";
import Drug from "../../models/pharmacy/pDrugs.mode.js";
import { protect,admin } from "../../middleware/protect.js";


const phamrcyAdminrouter = express.Router();

// Get admin reports
phamrcyAdminrouter.get('/', admin, async (req, res) => {
    const totalSales = await Order.aggregate([
        { $match: { status: 'Delivered' } },
        { $group: { _id: null, totalSales: { $sum: '$totalPrice' } } },
    ]);

    const lowStockDrugs = await Drug.find({ stock: { $lt: 10 } });

    const topSellingDrugs = await Order.aggregate([
        { $unwind: '$orderItems' },
        { $group: { _id: '$orderItems.drug', totalSold: { $sum: '$orderItems.quantity' } } },
        { $sort: { totalSold: -1 } },
        { $limit: 5 },
    ]);

    res.json({ totalSales, lowStockDrugs, topSellingDrugs });
});

export default phamrcyAdminrouter
