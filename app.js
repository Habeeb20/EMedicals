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





import errorHandler from "./middleware/errorMiddleware.js";

import hospitalrouter from "./routes/hospital/appointment.js";
import HReportrouter from "./routes/hospital/HReport.route.js";
import hospitalresultRouter from "./routes/hospital/hospitalResult.js";
import undertakerRouter from "./routes/undertakerRoute.js";
import undertakerCommentRouter from "./routes/undertaker.route/commentUndertaker.route.js";
import medicalPhamarcysellerrouter from "./routes/MedicalPhamarcy.routes/medicalAuthRoute.js";
import medicalPhamarcyproductrouter from "./routes/MedicalPhamarcy.routes/medicalProduct.js";
import medicalPhamarcysalerouter from "./routes/MedicalPhamarcy.routes/medicalPharmacySales.route.js";
import hrmsHolidayRouter from "./routes/HRMS.route/hrmsHoliday.route.js";
import HRMSauthRouter from "./routes/HRMS.route/HRMSadmin.route.js";
import hrmsemployeerouter from "./routes/HRMS.route/HrmsEmployee.route.js";
import attendanceRouter from "./routes/HRMS.route/HRMSAttendance.route.js";
import payrollRouter from "./routes/HRMS.route/hrmsPayroll.router.js";
import deathRecordRouter from "./routes/hospital/deathRecord.route.js";
import hrmsLetterRouter from "./routes/HRMS.route/HRMSLetter.route.js";
import mortuaryDeathRouter from "./routes/Mortuary/mortuaryDeath.route.js";
import superAdminRouter from "./routes/superAdmin/superAdmin.route.js";
import hospitalpayment from "./routes/hospital/PaymentHospital.js";
import PharmacyPayment from "./models/medicalPhamarcy/PharmacyPayment.js";
import pharmcacypayment from "./routes/MedicalPhamarcy.routes/phpayment.route.js";
import labPaymentrouter from "./routes/lab/labpayment.route.js";
import doctorpaymentrouter from "./routes/Doctors/doctorPayment.route.js";
import mortuaryPaymentrouter from "./routes/Mortuary/mortuaryPayment.js";
import userPaymentrouter from "./routes/User/userPayment.js";
import telePaymentrouter from "./routes/Telemedicine/telePaymentRoute.js";
import hrmspayment from "./routes/HRMS.route/HRMSPayment.route.js";

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



// const corsOptions = {
//   origin: "https://emedicals.ng/", // Specific origin
//   credentials: true,  // Allow cookies and auth
//   methods: ["GET", "POST", "PUT", "DELETE"],  // Allow specific methods
//   allowedHeaders: ["Content-Type", "Authorization"],  // Allow specific headers
// };


// app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));

app.use("/uploads", express.static(path.join(__dirname, "/client/dist")));
app.use(morgan("dev"));




//user
app.use("/api/users", router);
app.use("/api/user", userPaymentrouter)

//doctor

app.use("/api/doctors", doctorRouter);
app.use("/api/patients", patientRouter);
app.use("/api/appointment", appointmentrouter);
app.use("/api/patients", patientDonateRoute);
app.use("/api/patients", patientMedicalRoute);
app.use("/api/patients", medicalTestRoute);
app.use("/api/doctors", doctorpaymentrouter)

//doctorchat
app.use("/api/doctorchat/auth", authchatrouter);
app.use("/api/doctorchat/messages", messagechatrouter);
app.use("/api/doctorchat/users", userchatrouter);


//mortuary

app.use("/api/mortuary", mortuaryrouter);
app.use("/api/mortuary", mortuaryCommentRouter);
app.use("/api/mortuary", messageRouter);
app.use("/api/mortuary", mortuaryDeathRouter)
app.use("/api/mortuary", mortuaryPaymentrouter)

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
app.use("/api/hospital", hospitalresultRouter)
app.use("/api/hospital", deathRecordRouter)
app.use("/api/quickaction", cdoctorRoute)
app.use("/api/hospital", hospitalpayment)



//wellness
app.use("/api/wellness", wellnessrouter)

//undertaker
app.use("/api/undertaker", undertakerRouter)
app.use("/api/undertaker", undertakerCommentRouter)


//teleuser
app.use("/api/teleuser", teleRouter)
app.use("/api/teleuser", teleDoctorRouter)
app.use("/api/teleuser", telePaymentrouter)



//lab
app.use("/api/lab", labTestRoute )
app.use("/api/lab", labUserRouter)
app.use("/api/lab", labcommentRouter)
app.use("/api/lab", labPaymentrouter)





//medical pharmacy
app.use("/api/medical/auth", medicalPhamarcysellerrouter)
app.use("/api/medical/products", medicalPhamarcyproductrouter)
app.use("/api/medical/sales", medicalPhamarcysalerouter)
app.use("/api/medical/payment", pharmcacypayment)


app.use("/api/hrms", hrmsHolidayRouter)
app.use("/api/hrms", HRMSauthRouter)
app.use("/api/hrms", hrmsemployeerouter)
app.use("/api/hrms", attendanceRouter)
app.use("/api/hrms", payrollRouter)
app.use("/api/hrms", hrmsLetterRouter)
app.use("/api/hrms", hrmspayment)
app.use("/api/superadmin", superAdminRouter)


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





















































































































