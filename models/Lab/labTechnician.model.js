
import mongoose from "mongoose";

const testSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "LabUser", required: true },
    technician: { type: mongoose.Schema.Types.ObjectId, ref: "LabUser" },
  },
  { timestamps: true }
);

const Test = mongoose.model("Test", testSchema);
export default Test;
