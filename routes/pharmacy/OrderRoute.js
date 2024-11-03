import express from "express"
import { verifyToken } from "../../middleware/verifyToken.js";
import { addOrder, getAOrder, getOrders, orderStatus } from "../../controllers/pharmacy/orderController.js";
import { protect } from "../../middleware/protect.js";


const pharmacyOrderRoute = express.Router()

pharmacyOrderRoute.post("/createorder", protect, addOrder)
pharmacyOrderRoute.get("/getorder", protect, getOrders)
pharmacyOrderRoute.get("getaorder/:id", protect, getAOrder)
pharmacyOrderRoute.put("/orderstatus", orderStatus)

export default pharmacyOrderRoute