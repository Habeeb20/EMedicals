import { verifyToken } from "../../middleware/verifyToken.js"
import Attendance from "../../models/HRMS/HRMSAttendance.schema.js"
import Employee from "../../models/HRMS/HRMSEmployee.schema.js"
import express from "express"
const attendanceRouter = express.Router()

attendanceRouter.post("/attendance", verifyToken, async (req, res) => {
    const { email } = req.body;
  
    try {

      const employee = await Employee.findOne({ 
        email: email, 
        adminId: req.user.id 
      });
  
      if (!employee) {
        return res.status(404).json({ 
          message: "Employee not found or not registered under this admin" 
        });
      }
  
      const time = new Date().toLocaleTimeString();

      const attendance = await Attendance.create({
        employeeId: employee._id, 
        employeeName: `${employee.firstname} ${employee.lastname}`,
        adminId: req.user.id, 
        time,
      });
  
      res.status(201).json(attendance);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  });
  
attendanceRouter.get("/getattendance", verifyToken, async(req, res) => {
    try {
        const records = await Attendance.find({adminId:req.user.id}).populate('employeeId', "firstname lastname jobType jobRole");
        return res.status(200).json(records);
     
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
})


attendanceRouter.delete('/deleteattendance/:id', verifyToken, async(req, res) => {
    try {
        const attendance = await Attendance.findByIdAndDelete({_id: req.params.id, adminId:req.user.id})
        if(!attendance)return res.status(404).json({message:"attendance not found"})
        
        return res.status(200).json({message: "attendance deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
})

export default attendanceRouter