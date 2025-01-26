import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
    buyerName: { type: String, required: true },
    seller :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Seller',
        required: true
    },
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: String, required: true },
            sellingPrice: { type: String, required: true },
            total: { type: String, required: true },
        },
    ],
    totalAmount: { type: String, required: true }, 
    date: { type: Date, default: Date.now }
});

export default mongoose.model('MedicalSale', saleSchema);
