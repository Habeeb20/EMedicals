import express from "express"
import { auth } from "../../middleware/verifyToken.js";
import { bookAppointment, getNotifications } from "../../controllers/hospital/patientController.js";

const hospitalpatientrouter = express.Router();


hospitalpatientrouter .post('/appointments/book', auth(['patient']), bookAppointment);
hospitalpatientrouter .get('/notifications', auth(['patient']), getNotifications);


export default hospitalpatientrouter ;
