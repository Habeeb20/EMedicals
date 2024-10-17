import express from "express"
import admin from "../../models/Admin/admin"
import { getAllAppointments } from "../../controllers/doctors/doctor.controller"


const adminRouter = express.Router()


adminRouter.get("/admin/appointments", getAllAppointments)