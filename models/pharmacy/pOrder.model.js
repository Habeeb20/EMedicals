
import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'PUser', required: true },
  orderItems: [
    {
      drug: { type: mongoose.Schema.Types.ObjectId, ref: 'Drug', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Shipped', 'Delivered'], default: 'Pending' },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
});

export default mongoose.model('Order', orderSchema);
