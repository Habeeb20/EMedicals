import express from "express"
import Drug from "../../models/pharmacy/pDrugs.mode.js"
import { verifyToken } from "../../middleware/verifyToken.js"
import { addDrug, deleteDrug, getAdrug, getDrugs, getDrugsForAPharmacist, updateDrug } from "../../controllers/pharmacy/drugController.js"

import upload from "../../upload.js"
import { get } from "mongoose"
import { admin, protect } from "../../middleware/protect.js"
const pharmacyDrugRoute = express.Router()



pharmacyDrugRoute.post("/drug",  protect,  upload,   addDrug)

pharmacyDrugRoute.get("/getdrug", getDrugs)
pharmacyDrugRoute.get("/getdrugforapharmacist", verifyToken, getDrugsForAPharmacist)

pharmacyDrugRoute.get("/getadrug/:id", getAdrug )
pharmacyDrugRoute.put("/updatedrug", protect,  admin, updateDrug)
pharmacyDrugRoute.delete("/deletedrug", protect, admin, deleteDrug)



export default pharmacyDrugRoute