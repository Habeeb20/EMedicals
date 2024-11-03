import mongoose from 'mongoose';

const drugSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  profilePicture: { type: String },
  requiresPrescription: { type: Boolean, default: false },
  pharmacistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PUser', 
  
  },
});

export default mongoose.model('Drug', drugSchema);
