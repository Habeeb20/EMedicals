import Doctor from "../../models/Doctors/doctor.model.js";
import { User } from "../../models/user.models.js";
import HUser from "../../models/hospitals/userSchema.js";

export const getAllDoctors2 = async (req, res) => {
  try {
    const { page = 1, limit = 10, searchTerm } = req.query;

    // Build filter object
    let filter = {};

    // Search by fullname, state, LGA, and officeAddress
    if (searchTerm) {
      filter.$or = [
        { fullname: { $regex: searchTerm, $options: "i" } },
        { state: { $regex: searchTerm, $options: "i" } },
        { LGA: { $regex: searchTerm, $options: "i" } },
        { officeAddress: { $regex: searchTerm, $options: "i" } },
      ];
    }

    // Get total count for pagination
    const totalDoctors = await Doctor.countDocuments(filter);
    const totalPages = Math.ceil(totalDoctors / limit);

    // Get paginated results
    const doctors = await Doctor.find(filter)
      .select({
        fullname: 1,
        email: 1,
        phoneNumber: 1,
        state: 1,
        LGA: 1,
        officeAddress: 1,
        profilePicture: 1,
        currentWorkplace: 1,
        specialization: 1,
        verified: 1,
        online: 1,
      })
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .exec();

    res.status(200).json({
      doctors,
      totalPages,
      currentPage: Number(page),
      totalDoctors,
    });
  } catch (error) {
    console.error("Error in getAllDoctors:", error);
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
};

export const getHospital2 = async (req, res) => {
  try {
    const { page = 1, limit = 10, searchTerm } = req.query;

    // Build filter object
    let filter = {};

    // Search by name, location, state, LGA, and specialization
    if (searchTerm) {
      filter.$or = [
        { name: { $regex: searchTerm, $options: "i" } },
        { location: { $regex: searchTerm, $options: "i" } },
        { state: { $regex: searchTerm, $options: "i" } },
        { LGA: { $regex: searchTerm, $options: "i" } },
        { specialization: { $regex: searchTerm, $options: "i" } },
      ];
    }

    // Optionally filter by hospital-related roles (e.g., admin, doctor)
    filter.role = { $in: ["admin", "doctor"] }; // Focus on hospital staff

    // Get total count for pagination
    const totalUsers = await HUser.countDocuments(filter);
    const totalPages = Math.ceil(totalUsers / limit);

    // Get paginated results
    const users = await HUser.find(filter)
      .select({
        name: 1,
        email: 1,
        role: 1,
        phone: 1,
        profilePicture: 1,
        location: 1,
        state: 1,
        LGA: 1,
        specialization: 1,
        doctorTime: 1,
        createdAt: 1,
      })
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .exec();

    res.status(200).json({
      users,
      totalPages,
      currentPage: Number(page),
      totalUsers,
    });
  } catch (error) {
    console.error("Error in getHospital:", error);
    res.status(500).json({ error: "Failed to fetch hospital users" });
  }
};