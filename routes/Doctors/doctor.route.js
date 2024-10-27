import express from "express"
import { registerDoctor, loginDoctor, getDoctorProfile, updateDoctorProfile, getAllDoctors, getDoctorDetails } from "../../controllers/doctors/doctor.controller.js"
// import { register, login, getprofile, verifyEmail, forgotPassword, resetPassword, getAlldoctors, logout, updateDoctorProfile, registerDoctor, loginDoctor } from "../../controllers/doctors/doctor.controller.js"
import upload from "../../upload.js"
import { verifyToken } from "../../middleware/verifyToken.js"
import { uploadDetails } from "../../uploadDetails.js"

const doctorRouter = express.Router()

const uploadImages= uploadDetails.fields([
    {name:'profilePicture', maxCount: 1}
])


doctorRouter.post('/doctorsignup', upload, registerDoctor)
doctorRouter.post('/doctorlogin', loginDoctor)
doctorRouter.get('/doctorprofile', verifyToken, getDoctorProfile)
doctorRouter.put("/doctorsupdate/:id", verifyToken, updateDoctorProfile)
doctorRouter.get("/doctorgetall", getAllDoctors)
doctorRouter.get("/doctordetails/:id", getDoctorDetails)




export default doctorRouter