import express from "express"
import { createUserAccount } from "../../controllers/hospital/adminController.js";
import { auth } from "../../middleware/verifyToken.js";

const hospitaladminrouter = express.Router();


hospitaladminrouter.post('/create-user', auth(['admin']), createUserAccount);

export default hospitaladminrouter
