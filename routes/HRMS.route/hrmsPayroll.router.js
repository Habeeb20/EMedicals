import Payroll from "../../models/HRMS/HRMsPayroll.js";
import Employee from "../../models/HRMS/HRMSEmployee.schema.js"
import express from "express"
import { verifyToken } from "../../middleware/verifyToken.js";


const payrollRouter = express.Router()

payrollRouter.post("/makepayroll", verifyToken, async(req, res) => {
    const { employeeId, month, year, status, tax,  HMO, penalty, IOU  } = req.body;

    try {

      const employee = await Employee.findOne({ _id: employeeId, adminId: req.user.id });
      if (!employee) {
        return res.status(404).json({ message: "Employee not found or does not belong to this admin." });
      }

      const date = new Date().toLocaleString();

  
 
      const newPayroll = new Payroll({
        employeeId,
        employeeName: `${employee.firstname} ${employee.lastname}`,
        salary:`${employee.salary}`,
        adminId: req.user.id, 
        month,
        year,
        tax,
        HMO,
        penalty,
        IOU,
        status,
        date
      });
  
      const savedPayroll = await newPayroll.save();
      res.status(201).json(savedPayroll);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
})

payrollRouter.get("/getpayrolls", verifyToken, async(req, res) => {
    try {
        const records = await Payroll.find({adminId: req.user.id}).populate('employeeId', "firstname lastname salary" );
        res.json(records);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})

payrollRouter.get("/payroll/:employerId", verifyToken, async(req, res) => {
    try {
        const payroll = await Payroll.find({adminId:req.user.id, employerId:req.params.employerId}).populate('employerId', "firstname lastname");
        if (!payroll.length) return res.status(404).json({ message: 'Payroll not found' });
    
       
        res.json({ message: 'Payroll marked as paid', payroll });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})


payrollRouter.put("/updatepayroll/:id", verifyToken, async(req, res) => {
    const { status } = req.body;

    try {
        const payroll = await Payroll.findByIdAndUpdate(
            {_id:req.params.id, adminId: req.user.id},
            {status},
            {new:true}
        )
        if (!payroll) {
            return res.status(404).json({ message: "Payroll not found or does not belong to this admin." });
          }
          res.status(200).json(payroll);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }
})

payrollRouter.delete("/deletepayroll/:id", verifyToken, async(req, res) => {
    try {
        const payroll = await Payroll.findByIdAndDelete({ _id: req.params.id, adminId: req.user.id });
        if (!payroll) {
            return res.status(404).json({ message: "Payroll not found or does not belong to this admin." });
          }
          res.status(200).json({ message: "Payroll entry deleted successfully." });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });

    }
})

export default payrollRouter