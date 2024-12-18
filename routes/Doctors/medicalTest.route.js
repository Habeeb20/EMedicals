import express from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import {
  getMedicalForDoctor,
  getMedicalTest,
  createMedicalTest,
} from "../../controllers/doctors/MedicalTest.controller.js";

const medicalTestRoute = express.Router();

medicalTestRoute.post("/createmedicaltest/:id", verifyToken, createMedicalTest);
medicalTestRoute.get("/getmedicaltest/:patientId", verifyToken, getMedicalTest);
medicalTestRoute.get(
  "/getmedicaltestfordoctor",
  verifyToken,
  getMedicalForDoctor
);

export default medicalTestRoute;
