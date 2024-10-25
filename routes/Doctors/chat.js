import express from 'express';
import secureRoute from '../../middleware/secureRoute.js';
import {getMessage, sendMessage} from "../../controllers/doctors/chat/messageController.js"
import { allUsers,login,logout,signup } from '../../controllers/doctors/chat/user.controller.js';
import upload from '../../upload.js';


const doctorchatrouter = express.Router();


doctorchatrouter.post('/logindoctorchat', login);
doctorchatrouter.post("/doctorchatsignup", upload, signup)
doctorchatrouter.post("/doctorchatlogout", logout)
doctorchatrouter.get("/alldoctorchatusers", secureRoute, allUsers)

doctorchatrouter.post('/send/:id', secureRoute, sendMessage);
doctorchatrouter.get('/get/:id', secureRoute, getMessage);


export default doctorchatrouter;
