import express from "express"
import { register, login, getprofile, verifyEmail, forgotPassword, resetPassword, getAlldoctors, logout, updateDoctorProfile } from "../../controllers/doctors/doctor.controller.js"
import upload from "../../upload.js"
import { verifyToken } from "../../middleware/verifyToken.js"

const doctorRouter = express.Router()


doctorRouter.post('/doctorsignup',  register)
doctorRouter.post('/doctorlogin', login)
doctorRouter.get('/doctorprofile', verifyToken, getprofile)
doctorRouter.post('/doctorlogout', logout)
doctorRouter.post('/doctorverifyemail', verifyEmail)
doctorRouter.post("/doctorforgotpassword", forgotPassword)
doctorRouter.post("/doctorresetpassword/:token", resetPassword)
doctorRouter.get("/doctorgetalldoctors", getAlldoctors)
doctorRouter.put("/doctorsupdate:/id", verifyToken, updateDoctorProfile)


export default doctorRouter