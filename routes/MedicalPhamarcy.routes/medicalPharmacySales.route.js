import express from "express"
import Sale from "../../models/medicalPhamarcy/Sale.js"
import Product from "../../models/medicalPhamarcy/Product.js"
import { medicalPhamarcyProtect } from "../../middleware/authMiddleware.js"

const medicalPhamarcysalerouter = express.Router()


// medicalPhamarcysalerouter.post("/", medicalPhamarcyProtect, async(req, res) => {
//     const { buyerName, products } = req.body;

//     try {
//         const product = await Product.findOne({ _id: productId, seller: req.seller.id });
//         if (!product) return res.status(404).json({ error: 'Product not found' });

//         if (product.quantity < quantity) {
//             return res.status(400).json({ error: 'Insufficient stock' });
//         }

//         product.quantity -= quantity;
//         await product.save();

//         const sale = new Sale({
//             buyerName,
//             product: productId,
//             quantity,
//             sellingPrice: product.sellingPrice,
//             totalAmount: product.sellingPrice * quantity,
//             seller: req.seller.id
//         });

//         await sale.save();
//         res.status(201).json(sale);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// })



medicalPhamarcysalerouter.post("/", medicalPhamarcyProtect, async(req, res) => {
    const { buyerName, products } = req.body;

    try {
        let totalAmount = 0;
        const saleItems = []

        for (const item of products){
            const {productId, quantity} = item
        

        const product = await Product.findOne({ _id: productId, seller: req.user?.id });
        if (!product) {
            console.log("product with the id not found")
            return res.status(404).json({ message: `Product with ID ${productId} not found` });
        }

        if (product.quantity < quantity) {
            
            return res.status(400).json({ message: `Insufficient stock for product: ${product.name}` });
        }

        product.quantity -= quantity;
        await product.save();


        const productTotal = product.sellingPrice * quantity;
        totalAmount += productTotal;

        saleItems.push({
            product: productId,
            quantity,
            sellingPrice: product.sellingPrice,
            total: productTotal,
        });
    }

    const sale = new Sale({
        buyerName,
        items: saleItems, 
        totalAmount, 
        seller: req.seller.id,
    });

    await sale.save();
    res.status(201).json(sale);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
})






medicalPhamarcysalerouter.get("/getMedicalsales", medicalPhamarcyProtect, async(req, res) => {
    try {
        const sales = await Sale.find({ seller: req.seller.id }).populate('items');
        res.json(sales);
        console.log(sales)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


export default medicalPhamarcysalerouter