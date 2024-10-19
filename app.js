import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import connectDb from "./dbconnect.js";
import colors from "colors"
import path from "path"
import morgan from "morgan"
import {server, app} from "./socket.js"
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import multer from "multer";
import { ExpressPeerServer } from "peer";
import router from "./routes/User/user.route.js";
import doctorRouter from "./routes/Doctors/doctor.route.js";
import patientRouter from "./routes/Doctors/patient.route.js";
import mortuaryrouter from "./routes/Mortuary/mortuary.route.js";
import mortuaryCommentRouter from "./routes/Mortuary/mortuaryComment.route.js";

dotenv.config()


const __dirname = path.resolve();

const peerServer = ExpressPeerServer(server, {
    debug: true,
    allow_discovery: true,
});


app.use('/peerjs', peerServer);
// app.use(cors()); 



app.use(cors({
    origin:["http://localhost:5173", "http://localhost:5174",  "http://localhost:3000",  "http://localhost:3001"],
    methods:["GET", "POST", "DELETE", "PUT"],
    allowedHeaders:['Content-Type',  'Authorization'],
    credentials: true,
}))

app.use(cookieParser())
app.use(express.json());
app.use(express.static('public'));


app.use('/uploads',express.static(path.join(__dirname, '/client/dist')));
app.use(morgan('dev'))




//user
app.use('/api/users', router);




//doctor

app.use("/api/doctors", doctorRouter )
app.use("/api/patients", patientRouter)


//mortuary

app.use("/api/mortuary", mortuaryrouter)
app.use("/api/mortuary", mortuaryCommentRouter)


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); 
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
