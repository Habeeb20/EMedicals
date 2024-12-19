import Test from "../../models/Lab/labTechnician.model.js";

import LabUser from "../../models/Lab/Lab.Model.js";



export const createTest = async (req, res) => {
  const { name, description, price, patientId } = req.body;

  try {
 
    const patient = await LabUser.findById(patientId);
    if (!patient || patient.role !== "patient") {
      return res.status(400).json({ message: "Invalid or non-existent patient." });
    }

    // Create the test
    const test = await Test.create({
      name,
      description,
      price,
      patient: patientId,
    });

    res.status(201).json({ message: "Test created successfully.", test });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};

// Get all Tests
export const getAllTests = async (req, res) => {
  try {
    const tests = await Test.find()
      .populate("patient", "name email")
      .populate("technician", "name email");
    res.status(200).json(tests);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};

// // Get a Test by ID
// export const getTestById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const test = await Test.findById(id)
//       .populate("patient", "name email")
//       .populate("technician", "name email");

//     if (!test) {
//       return res.status(404).json({ message: "Test not found." });
//     }

//     res.status(200).json(test);
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ message: error.message });
//   }
// };

// Update a Test (Admin can update test details or assign a technician)



// export const updateTest = async (req, res) => {
//   const { id } = req.params;
//   const { name, description, price, status, technicianId } = req.body;

//   try {
//     const test = await Test.findById(id);
//     if (!test) {
//       return res.status(404).json({ message: "Test not found." });
//     }

//     // Validate and assign technician if provided
//     if (technicianId) {
//       const technician = await LabUser.findById(technicianId);
//       if (!technician || technician.role !== "technician") {
//         return res.status(400).json({ message: "Invalid or non-existent technician." });
//       }
//       test.technician = technicianId;
//     }

//     // Update fields
//     if (name) test.name = name;
//     if (description) test.description = description;
//     if (price) test.price = price;
//     if (status && ["Pending", "Completed"].includes(status)) {
//       test.status = status;
//     }

//     const updatedTest = await test.save();

//     res.status(200).json({
//       message: "Test updated successfully.",
//       test: updatedTest,
//     });
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ message: error.message });
//   }
// };

// Delete a Test
export const deleteTest = async (req, res) => {
  const { id } = req.params;

  try {
    const test = await Test.findById(id);
    if (!test) {
      return res.status(404).json({ message: "Test not found." });
    }

    await test.deleteOne();
    res.status(200).json({ message: "Test deleted successfully." });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};
