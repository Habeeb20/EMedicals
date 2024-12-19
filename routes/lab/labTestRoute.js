import express from "express";
import { createTest,  
    getAllTests,

    deleteTest, } from "../../controllers/Lab/labTest.Controller.js";

const router = express.Router();

router.post("/create", createTest);

router.get("/", getAllTests);


// router.get("/:id", getTestById);


// router.put("/:id", updateTest);


router.delete("/:id", deleteTest);

export default router;
