import express from 'express';
import { register, login,  registerUser,
    getAllPatients,
    getAllAppointments,
    getAllDoctorsActions,
    getAllDoctors,
    getAllNurses,
    loginUser,
    edit, } from '../../controllers/hospital/adminController.js';
import { auth } from '../../middleware/verifyToken.js';


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

export default router;

