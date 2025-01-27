import mongoose from "mongoose";
const payrollSchema = new mongoose.Schema({
 employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
    employeeName: { type: String, required: true },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Hrmsauth", required: true }, 
    month: { type: String, required: true },
    year: { type: String, required: true },
    salary: { type: String, required: true },
    status: { type: String, default: "Pending" }, 
    Date: {type:String, default: Date.now(), required: true}
  },
  { timestamps: true });


  export default mongoose.model("Payroll", payrollSchema)

