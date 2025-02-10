import express from "express"
import Product from "../../models/medicalPhamarcy/Product.js"
import { medicalPhamarcyProtect } from "../../middleware/authMiddleware.js"
import { body, validationResult } from "express-validator"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import multer from "multer"
import cloudinary from "../../utils/cloudinary.js"
import Seller from "../../models/medicalPhamarcy/Seller.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

const medicalPhamarcyproductrouter = express.Router()

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'essential',
        allowed_formats: ['jpg', 'jpeg', 'png'],
    },
});


const upload = multer({ storage });


const validateProduct = [
    body('name').notEmpty().withMessage('Name is required'),
    body('costPrice').notEmpty().withMessage('Cost Price is required'),
    body('sellingPrice').notEmpty().withMessage('Selling Price is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('quantity').notEmpty().withMessage('Quantity is required'),
];



medicalPhamarcyproductrouter.post("/", upload.single('picture'), validateProduct, medicalPhamarcyProtect, async(req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {

      
        const {  name, costPrice, sellingPrice, description, quantity } = req.body;
        
        const token = req.headers.authorization.split(" ")[1]; 
        
     
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
   
        const sellerId = decoded.id;

        if (!mongoose.Types.ObjectId.isValid(sellerId)) {
            return res.status(400).json({ error: "Invalid user ID." });
          }
        const seller = await Seller.findById(sellerId)
        if(!seller){
            return res.status(404).json({message: "seller not found"})
        }
        const newProduct = new Product({
            sellerId,
            name,
            costPrice,
            sellingPrice,
            description,
            quantity,
            picture: req.file?.path,
        })
        await newProduct.save()
        res.status(201).json({message:"new product has been successfully created"});
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
})


medicalPhamarcyproductrouter.put('/products/:id', upload.single('picture'), validateProduct, medicalPhamarcyProtect, async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    try {
        const product = await Product.findById(req.params.id)

        if(!product){
            return res.status(404).json({message: 'Product not found'})
        }

        if (product.sellerId.toString() !== req.body.sellerId) {
            return res.status(403).json({ message: 'Unauthorized to update this product' });
        }

        const updates = {
            ...req.body,
            picture: req.file?.path || product.picture, 
        };

        const updatedProduct = await MedicalProduct.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true }
        );

        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
})


//get all the products by a seller
medicalPhamarcyproductrouter.get("/myproducts", async (req, res) => {
    try {
     
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
      }
      const token = authHeader.split(" ")[1];
  
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const sellerId = decoded.id;
  
     
      if (!mongoose.Types.ObjectId.isValid(sellerId)) {
        return res.status(400).json({ error: "Invalid user ID." });
      }
  
      const seller = await Seller.findById(sellerId);
      if (!seller) {
        return res.status(404).json({ message: "Seller not found." });
      }
  
      const products = await Product.find({ sellerId });
  
    
      res.status(200).json({ products });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  });
  

//route  to delete a product
medicalPhamarcyproductrouter.delete("/products/:id", async(req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if(!product){
            return res.status(404).json({message: "product not found"})
        }

        if(product.sellerId.toString() !== req.body.sellerId){
            return res.status(403).json({message: 'unauthorized to delete this product'})
        }

        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({message: 'Product deleted successfully'})
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
})


///get a drug
medicalPhamarcyproductrouter.get("/aproduct/:id", async (req, res) => {
    const { id } = req.params; 
    
    try {
        const product = await Product.findById(id).populate("sellerId", "name email location state LGA");
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
});




medicalPhamarcyproductrouter.get("/allproducts", async(req, res) => {
        try {
            const products = await Product.find({}).populate("sellerId", "name email phone state")
            if(!products) return res.status(400).json({message: "not found"})
        
            return  res.status(200).json(products)
        } catch (error) {
            console.log(error)   
            return res.status(500).json({message: "an error occurred"})
        }
})
export default medicalPhamarcyproductrouter