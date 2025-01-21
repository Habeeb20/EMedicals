import express from "express"
import HReport from "../../models/hospitals/Report.js"
import { verifyToken } from "../../middleware/verifyToken.js"
import HUser from '../../models/hospitals/userSchema.js';
const HReportrouter = express.Router();


HReportrouter.post("/sendreport", verifyToken, async(req, res) => {
    try {
        const {adminId, complaints, doctorName, observation} = req.body;

        if(!adminId || !complaints || !doctorName || !observation) {
            console.log('All required fields must be filled')
            return res.status(400).json({ message: 'All required fields must be filled' });
        }
        const admin = await HUser.findById(adminId);
        console.log(admin)

        if (!admin || admin.role !== 'admin') {
            console.log("hospital not found")
            return res.status(404).json({ message: 'hospital not found' });
          }

          const Hreport = new HReport({
            patientId: req.user.id,
            adminId,
            complaints,
            doctorName,
            observation
          })

          await Hreport.save()

          res.status(201).json({message: 'report sent'})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error booking appointment' });
    }
})

export default HReportrouter