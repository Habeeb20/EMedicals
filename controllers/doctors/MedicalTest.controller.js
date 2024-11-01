import medicalTest from "../../models/Doctors/medicalTest.schema.js";
import Doctor from "../../models/Doctors/doctor.model.js";
import Patient from "../../models/Doctors/patient.model.js";
import mongoose from "mongoose";


// export const createMedicalTest = async(req, res) => {
//     const {sickness, started, drugsTaken, prescribedDrugs, cause, } = req.body
//     const patientId = req.params.patientId || req.body.patientId


//     try {
//         const patient = await Patient.findById(patientId)
//         if(!patient){
//             console.log("patient not found")
//             return res.status(404).json({message: 'patient not found'})
//         }
//         console.log(patient)

//         const doctor = await Doctor.findById(req.user.id);
        
//         if(!doctor) {
//             console.log("doctor not found")
//             return res.status(404).json({message:"doctor not found"})
//         }
//             const newMedicalTest = new medicalTest({
//                 doctorId:new mongoose.Types.ObjectId(req.user.id),
//                 patientId:new mongoose.Types.ObjectId(patientId),
//                 sickness, started, drugsTaken, prescribedDrugs, cause,
//             })

//             await newMedicalTest.save()
//             console.log("new medical result is saved")
//             res.status(200).json(newMedicalTest)
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ error: 'Failed to register medical test result' });
//     }
// }






//patient view medical



export const createMedicalTest = async (req, res) => {
    const { sickness, started, drugsTaken, prescribedDrugs, cause } = req.body;
    const patientId =  req.body.patientId;
    console.log("req.body:", req.body);


    try {

        console.log("Looking up patient with ID:", patientId);


        // Find patient by ID
        // const patient = await Patient.findById(patientId);
        // if (!patient) {
        //     console.log("Patient not found with ID:", patientId);
        //     return res.status(404).json({ message: 'Patient not found' });
        // }
        // console.log("Patient found:", patient);

        // Check if the doctor exists in req.user.id
        const doctor = await Doctor.findById(req.user.id);
        if (!doctor) {
            console.log("Doctor not found with ID:", req.user.id);
            return res.status(404).json({ message: "Doctor not found" });
        }

        // Create the new medical test record
        const newMedicalTest = new medicalTest({
            doctorId: new mongoose.Types.ObjectId(req.user.id),
            patientId: new mongoose.Types.ObjectId(patientId),
            sickness,
            started,
            drugsTaken,
            prescribedDrugs,
            cause,
        });

        // Save the new medical test
        await newMedicalTest.save();
        console.log("New medical test saved successfully");
        res.status(201).json(newMedicalTest);
    } catch (error) {
        console.error("Error saving medical test:", error);
        res.status(500).json({ error: 'Failed to register medical test result' });
    }
};





export const getMedicalTest = async (req, res) => {
    const patientId= req.user.id

    if(!patientId || patientId === "undefined"){
        console.log("patient not found")
        return res.status(400).json({error: "doctor not found"})
    }

    try {
        const medicaltest= await medicalTest.find({patientId}).populate('doctorId');
        res.json((medicaltest))
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch medicals' });
    }
}


export const getMedicalForDoctor = async(req, res) => {
    try {
        const doctorId = req.user.id
        if (!mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(400).json({ message: 'Invalid patient ID' });
          }
          console.log("Patient ID:", doctorId); 

          const doctorExist= await Doctor.findById(new mongoose.Types.ObjectId(doctorId))
          if(!doctorExist){
            return res.status(404).json({message: "doctor doesnt exist"})
          }

           const medicalTestResult= await medicalTest.find({doctorId:new mongoose.Types.ObjectId(doctorId)}).populate('patientId', 'fullname email, address, allergics'  )
       console.log("medical test found", medicalTestResult)
       res.status(200).json(medicalTestResult)
    } catch (error) {
        console.error("Error fetching medical test:", error.message); 
        return res.status(500).json({ message: 'Server error', error: error.message }); 
    }
}

 