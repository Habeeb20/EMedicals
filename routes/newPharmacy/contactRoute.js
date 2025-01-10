import express from "express"
import contactUs from "../../controllers/newPharmacy/contactController.js"
import { protect15 } from "../../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", protect15, contactUs)


export default router