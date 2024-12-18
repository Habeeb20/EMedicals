import express from "express"
// import { registerpatient, getAllPatients, getAPatient, bookAppointment  } from "../../controllers/doctors/patient.controller.js"
import { registerPatient, loginPatient, getPatientProfile, updatePatientProfile, getAllPatients, getProfile } from "../../controllers/doctors/patient.controller.js"
import { verifyToken } from "../../middleware/verifyToken.js";
import upload from "../../upload.js";
import patientMedicalHistorySchema from "../../models/Doctors/patientMedicalHistory.schema.js";
const patientRouter = express.Router();

patientRouter.post("/patientregister", upload, registerPatient)
patientRouter.post("/patientlogin", loginPatient)
patientRouter.get("/patientprofile", verifyToken, getProfile)
patientRouter.put("/updatepatient", verifyToken, updatePatientProfile)
patientRouter.get("/getallpatient", getAllPatients)
patientRouter.get("/getapatient/:id", getPatientProfile)


patientRouter.post("/share-medical-history", async(req, res) => {
    const {patientId, recipientEmail} = req.body;
    const doctorId = req.user.id

    const medicalHistory = await patientMedicalHistorySchema.findOne({patiendId});
    if(!medicalHistory){
        return res.status(404).json({message: 'Medical history not found'})
    }
    try {
        await sendEmail({
            to: recipientEmail,
            subject: `Medical History for Patient ${patientId}`,
            text: `Here is the medical history: ${JSON.stringify(medicalHistory)}`,
        });
        res.status(200).json({ message: 'Medical history shared successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to share medical history.', error });
    }
})

export default patientRouter