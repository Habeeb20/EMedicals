import mongoose from "mongoose";
const payrollSchema = new mongoose.Schema({
 employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
    employeeName: { type: String, required: true },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Hrmsauth", required: true }, 
    month: { type: String, required: true },
    year: { type: Number, required: true },
    salary: { type: Number, required: true },
    status: { type: String, default: "Pending" }, 
  },
  { timestamps: true });


  export default mongoose.model("Payroll", payrollSchema)

