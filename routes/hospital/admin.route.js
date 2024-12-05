import express from 'express';
import { register, login,  registerUser,
    getAllPatients,
    getAllAppointments,
    getAllDoctorsActions,
    getAllDoctors,
    getAllNurses,
    loginUser,
    edit,
    registerHospitalStaff,
    loginHospitalStaff,
    doctordashboard,
    doctoreditdashboard,
    patientdashboard,
    patienteditdashboard,
    getAllDoctorsForAdmin,
    getAllDoctorsForAdmin3,
    getAllNursesForAdmin,
    nursedashboard,
    nurseeditdashboard,
    getAllPatientsForAdmin, } from '../../controllers/hospital/adminController.js';
import { auth } from '../../middleware/verifyToken.js';
import { protect2, protect3 } from '../../middleware/protect.js';


const router = express.Router();



router.post('/register', register);
router.post('/login', login);
router.put('/edit/:id', auth(['admin']), edit);
// Register user (doctor, nurse, or patient)
router.post('/registerastaff', auth(['admin']),  registerUser);

router.post('/loginastaff', loginUser)

// Get all registered patients
router.get('/patients', auth(['admin']), getAllPatients);

// Get all appointments
router.get('/appointments', auth(['admin']), getAllAppointments);


router.get("/alldoctors", auth(['admin']), getAllDoctors)

router.get("/allnurses", auth(['admin']), getAllNurses)
// Get all doctors' actions (accept/reject/reschedule)
router.get('/doctor-actions', auth(['admin']), getAllDoctorsActions);





router.post("/registerhospitalstaff", registerHospitalStaff)
router.post("/loginhospitalstaff", loginHospitalStaff)
// router.get("/getdoctordashboard", protect2, doctordashboard)
// router.get("/getpatientdashboard", protect2, patientdashboard)
router.put("/editdoctor/:id", protect3, doctoreditdashboard)
router.put("/editnurse/:id", protect3, nurseeditdashboard)
router.put("/editpatient/:id", protect3, patienteditdashboard)


router.get("/getdoctordashboard", protect2, getAllDoctorsForAdmin)
router.get("/getnursedashboard", protect2, getAllNursesForAdmin)
router.get("/getpatientdashboard", protect2, getAllPatientsForAdmin)



router.get("/getpatientdashboard3", protect3, patientdashboard)
router.get("/getdoctordashboard3", protect3, doctordashboard)
router.get("/getnursedashboard3", protect3, nursedashboard)

export default router;

