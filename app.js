import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./dbconnect.js";
import colors from "colors";
import path from "path";
import morgan from "morgan";
import { server, app } from "./socket.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import multer from "multer";
import { ExpressPeerServer } from "peer";

    
import router from "./routes/User/user.route.js";
import doctorRouter from "./routes/Doctors/doctor.route.js";
import patientRouter from "./routes/Doctors/patient.route.js";
import mortuaryrouter from "./routes/Mortuary/mortuary.route.js";
import mortuaryCommentRouter from "./routes/Mortuary/mortuaryComment.route.js";
import messageRouter from "./routes/Mortuary/message.route.js";
import cemeteryRouter from "./routes/cemetery/cemetery.route.js";
import cemeteryCommentRouter from "./routes/cemetery/comment.js";
import appointmentrouter from "./routes/Doctors/appointment.js";
import authchatrouter from "./routes/Doctors/chat/authRoute.js";
import messagechatrouter from "./routes/Doctors/chat/messageRoute.js";
import userchatrouter from "./routes/Doctors/chat/userChatRoute.js";
import patientDonateRoute from "./routes/Doctors/patientDonate.route.js";
import patientMedicalRoute from "./routes/Doctors/patientMedicalHistory.route.js";
import medicalTestRoute from "./routes/Doctors/medicalTest.route.js";
import pharmacyDrugRoute from "./routes/pharmacy/drugRoute.js";
import pharmacyOrderRoute from "./routes/pharmacy/OrderRoute.js";
import phamrcyAdminrouter from "./routes/pharmacy/Admin.route.js";
// import pharmacyReviewRoute from "./routes/pharmacy/PReview.route.js";
import pharmacyRoute from "./routes/pharmacy/authRoute.js";





import wellnessrouter from "./routes/wellRoute.js";

import cdoctorRoute from "./routes/QuickAction/consultdoctorRoute.js";
import teleRouter from "./routes/Telemedicine/teleuser.Route.js";
import teleDoctorRouter from "./routes/Telemedicine/teleDoctor.Route.js";



import userRoute from "./routes/hospital/user.route.js"



import labUserRouter from "./routes/lab/labUserRoute.js"
import labTestRoute from "./routes/lab/labTestRoute.js"
import labcommentRouter from "./routes/lab/labComment.js";




import newPharmacyuserRoute from "./routes/newPharmacy/userRoute.js"
import newPharmacyproductRoute from "./routes/newPharmacy/productRoute.js"
import newPharmacycontactRoute from "./routes/newPharmacy/contactRoute.js"
import errorHandler from "./middleware/errorMiddleware.js";
import contactUs from "./controllers/newPharmacy/contactController.js";
import hospitalrouter from "./routes/hospital/appointment.js";
import HReportrouter from "./routes/hospital/HReport.route.js";
import undertakerRouter from "./routes/undertakerRoute.js";
import undertakerCommentRouter from "./routes/undertaker.route/commentUndertaker.route.js";

dotenv.config();


const __dirname = path.resolve();

const peerServer = ExpressPeerServer(server, {
  debug: true,
  allow_discovery: true,
});

app.use(
  cors({
    origin:["http://localhost:5173", "http://localhost:5174"],   
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);


// CORS setup: Enable CORS for the specific origin and with credentials
// const corsOptions = {
//   origin: "https://med.eschoolconnect.ng", // Specific origin
//   credentials: true,  // Allow cookies and authentication headers
//   methods: ["GET", "POST", "PUT", "DELETE"],  // Allow specific methods
//   allowedHeaders: ["Content-Type", "Authorization"],  // Allow specific headers
// };

// // Apply CORS middleware
// app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));

app.use("/uploads", express.static(path.join(__dirname, "/client/dist")));
app.use(morgan("dev"));




//user
app.use("/api/users", router);

//doctor

app.use("/api/doctors", doctorRouter);
app.use("/api/patients", patientRouter);
app.use("/api/appointment", appointmentrouter);
app.use("/api/patients", patientDonateRoute);
app.use("/api/patients", patientMedicalRoute);
app.use("/api/patients", medicalTestRoute);

//doctorchat
app.use("/api/doctorchat/auth", authchatrouter);
app.use("/api/doctorchat/messages", messagechatrouter);
app.use("/api/doctorchat/users", userchatrouter);

//mortuary

app.use("/api/mortuary", mortuaryrouter);
app.use("/api/mortuary", mortuaryCommentRouter);
app.use("/api/mortuary", messageRouter);

//cemetery
app.use("/api/cemetery", cemeteryRouter);
app.use("/api/cemetery", cemeteryCommentRouter);



//pharmacy

app.use("/api/pharmacy", pharmacyDrugRoute)
app.use("/api/pharmacy", pharmacyOrderRoute)
app.use("/api/pharmacy", phamrcyAdminrouter)
// app.use("/api/pharmacy", pharmacyReviewRoute)
app.use("/api/pharmacy", pharmacyRoute)



//hospital

app.use("/api/hospital", userRoute )
app.use("/api/hospital", hospitalrouter )
app.use("/api/hospital", HReportrouter)
app.use("/api/quickaction", cdoctorRoute)



//wellness
app.use("/api/wellness", wellnessrouter)

//undertaker
app.use("/api/undertaker", undertakerRouter)
app.use("/api/undertaker", undertakerCommentRouter)


//teleuser
app.use("/api/teleuser", teleRouter)
app.use("/api/teleuser", teleDoctorRouter)



//lab
app.use("/api/lab", labTestRoute )
app.use("/api/lab", labUserRouter)
app.use("/api/lab", labcommentRouter)



//new pharmacy
app.use("/newpharmacy/users", newPharmacyuserRoute)
app.use("/newpharmacy/products", newPharmacyproductRoute)
app.use("/newpharmacy/contactus", newPharmacycontactRoute)
app.use(errorHandler);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Database connection
const startServer = async () => {
  try {
    await connectDb();
    console.log(`Database connected successfully`.bgYellow.black);
  } catch (error) {
    console.error(`Database connection failed`.bgRed.white, error);
    process.exit(1);
  }

  const port = process.env.PORT || 8000;
  server.listen(port, () => {
    console.log(`Your app is listening on port ${port}`.bgGreen.black);
  });
};

startServer();



























































































































// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDb from "./dbconnect.js";
// import colors from "colors";
// import path from "path";
// import morgan from "morgan";
// import { server, app } from "./socket.js";
// import cookieParser from "cookie-parser";
// import cloudinary from "cloudinary";
// import multer from "multer";
// import { ExpressPeerServer } from "peer";
// import router from "./routes/User/user.route.js";
// import doctorRouter from "./routes/Doctors/doctor.route.js";
// import patientRouter from "./routes/Doctors/patient.route.js";
// import userRoute from "./routes/hospital/user.route.js";
// import userAdminroute from "./routes/hospital/admin.route.js";
// import userPatientroute from "./routes/hospital/userPatient.js";
// import labUserRouter from "./routes/lab/labUserRoute.js";
// import labTestRoute from "./routes/lab/labTestRoute.js";
// import labcommentRouter from "./routes/lab/labComment.js";
// import mortuaryrouter from "./routes/Mortuary/mortuary.route.js";
// import mortuaryCommentRouter from "./routes/Mortuary/mortuaryComment.route.js";
// import messageRouter from "./routes/Mortuary/message.route.js";
// import cemeteryRouter from "./routes/cemetery/cemetery.route.js";
// import cemeteryCommentRouter from "./routes/cemetery/comment.js";
// import appointmentrouter from "./routes/Doctors/appointment.js";
// import authchatrouter from "./routes/Doctors/chat/authRoute.js";
// import messagechatrouter from "./routes/Doctors/chat/messageRoute.js";
// import userchatrouter from "./routes/Doctors/chat/userChatRoute.js";
// import patientDonateRoute from "./routes/Doctors/patientDonate.route.js";
// import patientMedicalRoute from "./routes/Doctors/patientMedicalHistory.route.js";
// import medicalTestRoute from "./routes/Doctors/medicalTest.route.js";
// import pharmacyDrugRoute from "./routes/pharmacy/drugRoute.js";
// import pharmacyOrderRoute from "./routes/pharmacy/OrderRoute.js";
// import phamrcyAdminrouter from "./routes/pharmacy/Admin.route.js";
// // import pharmacyReviewRoute from "./routes/pharmacy/PReview.route.js";
// import pharmacyRoute from "./routes/pharmacy/authRoute.js";
// import hospitaladminrouter from "./routes/hospital/admin.route.js";
// import hospitaldoctorrouter from "./routes/hospital/doctor.route.js";
// import hospitalpatientrouter from "./routes/hospital/patient.route.js";
// import wellnessrouter from "./routes/wellRoute.js";
// import HRouter from "./routes/hospital/hospitalRoute.js"
// import cdoctorRoute from "./routes/QuickAction/consultdoctorRoute.js";
// import teleRouter from "./routes/Telemedicine/teleuser.Route.js";
// import teleDoctorRouter from "./routes/Telemedicine/teleDoctor.Route.js";

// // Import other routes...

// dotenv.config();

// const __dirname = path.resolve();

// const peerServer = ExpressPeerServer(server, {
//   debug: true,
//   allow_discovery: true,
// });

// // CORS setup: Enable CORS for the specific origin and with credentials
// const corsOptions = {
//   origin: "https://med.eschoolconnect.ng", // Specific origin
//   credentials: true,  // Allow cookies and authentication headers
//   methods: ["GET", "POST", "PUT", "DELETE"],  // Allow specific methods
//   allowedHeaders: ["Content-Type", "Authorization"],  // Allow specific headers
// };

// // Apply CORS middleware
// app.use(cors(corsOptions));

// app.use(cookieParser());
// app.use(express.json());
// app.use(express.static("public"));

// app.use("/uploads", express.static(path.join(__dirname, "/client/dist")));
// app.use(morgan("dev"));

// // Your route setup
// app.use("/api/users", router);
// app.use("/api/doctors", doctorRouter);
// app.use("/api/patients", patientRouter);
// // Use other routes...

// app.use("/api/appointment", appointmentrouter);
// app.use("/api/patients", patientDonateRoute);
// app.use("/api/patients", patientMedicalRoute);
// app.use("/api/patients", medicalTestRoute);

// //doctorchat
// app.use("/api/doctorchat/auth", authchatrouter);
// app.use("/api/doctorchat/messages", messagechatrouter);
// app.use("/api/doctorchat/users", userchatrouter);

// //mortuary
// app.use("/api/mortuary", mortuaryrouter);
// app.use("/api/mortuary", mortuaryCommentRouter);
// app.use("/api/mortuary", messageRouter);

// //cemetery
// app.use("/api/cemetery", cemeteryRouter);
// app.use("/api/cemetery", cemeteryCommentRouter);

// //pharmacy
// app.use("/api/pharmacy", pharmacyDrugRoute)
// app.use("/api/pharmacy", pharmacyOrderRoute)
// app.use("/api/pharmacy", phamrcyAdminrouter)
// // app.use("/api/pharmacy", pharmacyReviewRoute)
// app.use("/api/pharmacy", pharmacyRoute)

// //hospital
// app.use("/api/hospital", hospitaladminrouter)
// app.use("/api/hospital", hospitaldoctorrouter)
// app.use("/api/hospital", hospitalpatientrouter)
// app.use("/api/hospital", HRouter )
// app.use("/api/quickaction", cdoctorRoute)

// //wellness
// app.use("/api/wellness", wellnessrouter)

// //teleuser
// app.use("/api/teleuser", teleRouter)
// app.use("/api/teleuser", teleDoctorRouter)

// //lab
// app.use("/api/lab", labTestRoute )
// app.use("/api/lab", labUserRouter)
// app.use("/api/lab", labcommentRouter)


// // Storage setup for multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, ${Date.now()}-${file.originalname});
//   },
// });
// const upload = multer({ storage });

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Database connection
// const startServer = async () => {
//   try {
//     await connectDb();
//     console.log(Database connected successfully.bgYellow.black);
//   } catch (error) {
//     console.error(Database connection failed.bgRed.white, error);
//     process.exit(1);
//   }

//   const port = process.env.PORT || 8000;
//   server.listen(port, () => {
//     console.log(Your app is listening on port ${port}.bgGreen.black);
//   });
// };

// startServer();