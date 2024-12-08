import express from "express"
import { verifyToken } from "../../middleware/verifyToken.js"
import { CgetAllDoctors, CgetDoctorDetails, CgetDoctorProfile, CregisterDoctor } from "../../controllers/quickAction/consultDoctor.controller.js"


const cdoctorRoute = express.Router()


cdoctorRoute.post("/cdoctorsignup", CregisterDoctor)
// cdoctorRoute.post("/cdoctorlogin", CloginDoctor)
cdoctorRoute.get("/cdoctorprofile", verifyToken, CgetDoctorProfile)
cdoctorRoute.get("/cdoctorgetall", CgetAllDoctors)
cdoctorRoute.get("/cdoctordetails/:id", CgetDoctorDetails)



export default cdoctorRoute