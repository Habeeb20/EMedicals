import express from "express"
import { addTeleDoctor, getAllTeleDoctors, getTeleAppointment, getTeleDoctorforAdmin, postTeleAppointment } from "../../controllers/Telemedicine/teleAppointmentController.js";
import {protect6} from "../../middleware/authMiddleware.js"

const authenticate = async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: "Unauthorized" });
    }
  };
  

const teleDoctorRouter = express.Router()

teleDoctorRouter.get("/getteledoctorforadmin", protect6, getTeleDoctorforAdmin)
teleDoctorRouter.post("/addteledoctorforadmin", addTeleDoctor)
teleDoctorRouter.get("/allteledoctor", getAllTeleDoctors)
teleDoctorRouter.get("/teleappointment", getTeleAppointment)
teleDoctorRouter.post("/addteleappointment", postTeleAppointment)



export default teleDoctorRouter