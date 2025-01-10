import express from "express"
import { protect15 } from "../../middleware/authMiddleware.js";
import { upload } from "../../utils/fileUpload.js";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../../controllers/newPharmacy/productController.js";
const router = express.Router();


router.post("/", protect15, upload.single("image"), createProduct)
router.patch("/:id", protect15, upload.single("image"), updateProduct)
router.get("/", protect15, getProducts);
router.get("/:id",protect15, getProduct );
router.delete("/:id", protect15, deleteProduct)


export default router