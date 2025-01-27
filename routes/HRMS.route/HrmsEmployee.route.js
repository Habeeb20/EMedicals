import express from "express"
import Employee from "../../models/HRMS/HRMSEmployee.schema.js"
import crypto from "crypto"
import { verifyToken } from "../../middleware/verifyToken.js"
import cloudinary from "cloudinary"
const hrmsemployeerouter = express.Router()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
  })
  
hrmsemployeerouter.post('/createmployee', verifyToken, async (req, res) => {
    const uniqueNumber = `RL-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    const { firstname, lastname, phone, email, jobRole, qualification, designation, department, jobType, salary,  } = req.body;

    try {
        const adminId = req.user.id;
        const confirmExistingEmail = await Employee.findOne({email})
        if(confirmExistingEmail) return res.status(400).json({message: "email already existed"})
        const employee = await Employee.create({
            firstname,
            lastname,
            phone,
            email,
            jobRole,
            qualification,
            designation,
            department,
            jobType,
            uniqueNumber,
            salary,
            adminId
         
          });
         
    
          res.status(201).json(employee)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
})



hrmsemployeerouter.get('/getmystaffs', verifyToken, async(req, res) => {
    try {
        const employees = await Employee.find({ adminId: req.user.id });
        console.log(employees)
        res.status(200).json(employees);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})

hrmsemployeerouter.get('/getAstaff/:id', verifyToken, async (req, res) => {
    try {
        const employee = await Employee.findOne({ _id: req.params.id, adminId: req.user.id }); // Ensure it belongs to the admin
        if (!employee) return res.status(404).json({ message: "Employee not found" });
        res.status(200).json(employee);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})


hrmsemployeerouter.get("/user-details/:email", verifyToken, async(req, res) => {
  const email = req.params.email

  try {
    const user = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    const payroll = await db.query('SELECT * FROM payroll WHERE user_email = ?', [email]);
    const attendance = await db.query('SELECT * FROM attendance WHERE user_email = ?', [email]);
    const department = await db.query('SELECT * FROM departments WHERE email = ?', [email]);

    res.json({
      user: user[0],
      payroll,
      attendance,
      department,
  });

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error fetching details', error });
  }
})

hrmsemployeerouter.put('/updatestaffs/:id', verifyToken, async(req, res) => {
    try {
        const updatedEmployee = await Employee.findOneAndUpdate(
          { _id: req.params.id, adminId: req.user.id }, 
          req.body,
          { new: true }
        );
    
        if (!updatedEmployee) return res.status(404).json({ message: "Employee not found" });
        res.status(200).json(updatedEmployee);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
})

hrmsemployeerouter.delete('/deletestaffs/:id', verifyToken, async(req, res) => {
    try {
        const deletedEmployee = await Employee.findOneAndDelete({ _id: req.params.id, adminId: req.user.id }); // Ensure it belongs to the admin
        if (!deletedEmployee) return res.status(404).json({ message: "Employee not found" });
        res.status(200).json({ message: "Employee deleted successfully" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})

export default hrmsemployeerouter