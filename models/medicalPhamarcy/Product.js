import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    sellerId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Seller',
    },
    name: { type: String, required: true },
    costPrice: { type: String, required: true },
    sellingPrice: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: String, required: true }
});

export default mongoose.model('MedicalProduct', productSchema); 
